import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { CryptoHelper } from '../../helpers/crypto.helper';
import { RegisterDto } from './dtos/register.dto';
import { UidHelper } from '../../helpers/uid.helper';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    let user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('User Not found');
    }

    const validPassword = CryptoHelper.verifyHash(
      loginDto.password,
      user.passwordHash,
      user.passwordSalt,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect Password');
    }

    if (!user.tokenKey) {
      const tokenKey = CryptoHelper.encryptBase64(UidHelper.generate());
      user = await this.usersService.update(user._id, { tokenKey });
    }

    const token = this.authService.createToken(
      user._id,
      user.tokenKey,
      user.role,
    );

    return {
      user,
      token,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {

    const hashedPassword = CryptoHelper.hashPassword(registerDto.password);
    registerDto.passwordHash = hashedPassword.hash;
    registerDto.passwordSalt = hashedPassword.salt;
    registerDto.tokenKey = CryptoHelper.encryptBase64(UidHelper.generate());
    const newUser = await this.usersService.create(registerDto);

    const token = this.authService.createToken(
      newUser._id,
      newUser.tokenKey,
      newUser.role,
    );

    return {
      user: newUser,
      token,
    };
  }
}
