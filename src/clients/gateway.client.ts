import { Transport } from '@nestjs/microservices';

export const gatewayClient = {
  name: 'USER_CLIENT',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: process.env.TRANSPORT_PORT_USER_SERVICE,
  },
};
