import { Transport } from '@nestjs/microservices';

export const userClient = {
  name: 'USER_CLIENT',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: parseInt(process.env.TRANSPORT_PORT_USER_SERVICE),
  },
};
