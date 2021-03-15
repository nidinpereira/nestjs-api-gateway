import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '../../enums/userRole.enum';
import { UserRoles } from '../../decorators/user-roles.decorator';
import { RolesGuard } from '../../guards/user-roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ProductReviewsService } from './product-reviews.service';
import { CreateProductReviewDto } from './dtos/create-product-review.dto';
import { UpdateProductReviewDto } from './dtos/update-product-review.dto';
import { AuthUser } from '../../decorators/user.decorator';
import { User } from '../users/interfaces/user.interface';
import { ProductReview } from './interfaces/product-review.interface';

@Controller('products/reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UserRoles(UserRole.ADMIN, UserRole.USER)
  @Post()
  async create(
    @Body() createProductReviewDto: CreateProductReviewDto,
    @AuthUser() user: User,
  ) {
    createProductReviewDto.userId = user._id;
    createProductReviewDto.name = user.name;
    return this.productReviewsService.create(createProductReviewDto);
  }

  @Get()
  async findAll(): Promise<ProductReview[]> {
    return this.productReviewsService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductReview> {
    return this.productReviewsService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UserRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    return this.productReviewsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UserRoles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.productReviewsService.delete(id);
    return 'success';
  }
}
