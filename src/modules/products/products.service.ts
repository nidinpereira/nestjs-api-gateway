import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_CLIENT')
    private readonly productsClient: ClientProxy,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    return this.productsClient
      .send({ resource: 'products', cmd: 'post' }, { ...createProductDto })
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      )
      .toPromise();
  }

  async findAll(): Promise<any[]> {
    return this.productsClient
      .send({ resource: 'products', cmd: 'getAll' }, {})
      .toPromise();
  }

  async findOne(query: any): Promise<any> {
    return this.productsClient
      .send({ resource: 'products', cmd: 'getOne' }, { ...query })
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

  async update(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    return this.productsClient
      .send(
        { resource: 'products', cmd: 'update' },
        { _id: id, ...updateProductDto },
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
      .send({ resource: 'products', cmd: 'delete' }, { _id: id })
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
