import { Module } from '@nestjs/common';
import { ProductReviewsController } from './product-reviews.controller';
import { ProductReviewsService } from './product-reviews.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.TRANSPORT_URL_PRODUCT_SERVICE,
          port: parseInt(process.env.TRANSPORT_PORT_PRODUCT_SERVICE),
        },
      },
    ]),
  ],
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService],
})
export class ProductReviewsModule {}
