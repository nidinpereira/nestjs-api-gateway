import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
export class JwtHelper {
  public static sign(uid: string, token: string) {
    const jwtPayload = {
      uid: uid,
      token: token,
      alg: process.env.JWT_ALGORITHM,
      iss: process.env.JWT_ISS,
      sub: process.env.JWT_SUB,
      aud: process.env.JWT_AUD,
      iat: moment().unix(),
      exp: moment().add(2, 'years').unix(),
    };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET);
  }
}
