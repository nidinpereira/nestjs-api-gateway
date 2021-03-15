import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductReview } from './interfaces/product-review.interface';
import { CreateProductReviewDto } from './dtos/create-product-review.dto';
import { UpdateProductReviewDto } from './dtos/update-product-review.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ProductReviewsService {
  constructor(
    @Inject('PRODUCTS_CLIENT')
    private readonly productsClient: ClientProxy,
  ) {}

  async create(
    createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    return this.productsClient
      .send(
        { resource: 'product-reviews', cmd: 'post' },
        { ...createProductReviewDto },
      )
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      )
      .toPromise();
  }

  async findAll(query: any, limit = 100, sort?): Promise<ProductReview[]> {
    return this.productsClient
      .send(
        { resource: 'product-reviews', cmd: 'getAll' },
        {
          query,
          limit,
          sort,
        },
      )
      .toPromise();
  }

  async findOne(query: any): Promise<any> {
    return this.productsClient
      .send({ resource: 'product-reviews', cmd: 'getOne' }, { ...query })
      .pipe(
        catchError((err) => {
          if (err.message === 'Not Found') {
            throw new NotFoundException();
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }

  async update(
    id: string,
    updateProductReviewDto: UpdateProductReviewDto,
  ): Promise<any> {
    return this.productsClient
      .send(
        { resource: 'product-reviews', cmd: 'update' },
        { _id: id, ...updateProductReviewDto },
      )
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      )
      .toPromise();
  }

  async delete(id: string): Promise<any> {
    return this.productsClient
      .send({ resource: 'product-reviews', cmd: 'delete' }, { _id: id })
      .pipe(
        catchError((err) => {
          if (err.message === 'Not Found') {
            throw new NotFoundException();
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }
}
