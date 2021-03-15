import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../../enums/userRole.enum';
import * as moment from 'moment';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;
  @IsOptional()
  @IsString()
  readonly phoneNumber?: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  passwordHash?: string;
  @IsOptional()
  passwordSalt?: string;

  @IsEnum(UserRole)
  role?: UserRole = UserRole.USER;

  updatedAt?: string = moment().format();

  @IsOptional()
  lastLoginAt?: string;
  @IsOptional()
  @IsString()
  tokenKey?: string;
}
