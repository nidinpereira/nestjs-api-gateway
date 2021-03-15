import { Transport } from '@nestjs/microservices';

export const productClient = {
  name: 'PRODUCT_CLIENT',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: process.env.TRANSPORT_PORT_PRODUCT_SERVICE,
  },
};
