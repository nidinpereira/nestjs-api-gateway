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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UserRole } from '../../enums/userRole.enum';
import { UserRoles } from '../../decorators/user-roles.decorator';
import { RolesGuard } from '../../guards/user-roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ProductReviewsService } from '../product-reviews/product-reviews.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productReviewsService: ProductReviewsService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UserRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    const products = await this.productsService.findAll();

    return Promise.all(
      products.map(async (product) => {
        product.reviews = await this.productReviewsService.findAll(
          {
            productId: product._id,
          },
          3,
          { _id: -1 },
        );
        return product;
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UserRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UserRoles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.productsService.delete(id);
    return 'success';
  }
}
