import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import moment = require('moment');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createToken = (uid, tokenKey, role) => {
    const jwtPayload = {
      uid,
      tokenKey,
      alg: process.env.JWT_ALGORITHM,
      iss: process.env.JWT_ISSUER,
      sub: process.env.JWT_SUBJECT,
      aud: process.env.JWT_AUDIENCE,
      iat: moment().unix(),
      role,
    };

    return this.jwtService.sign(jwtPayload);
  };
}
