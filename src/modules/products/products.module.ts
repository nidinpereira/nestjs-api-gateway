import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductReviewsService } from '../product-reviews/product-reviews.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: parseInt(process.env.TRANSPORT_PORT_PRODUCT_SERVICE),
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductReviewsService],
})
export class ProductsModule {}
