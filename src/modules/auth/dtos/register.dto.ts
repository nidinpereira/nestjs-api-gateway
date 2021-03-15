import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { UserRole } from '../../../enums/userRole.enum';
import * as moment from 'moment';

export class RegisterDto {
  @IsOptional()
  readonly _id: ObjectId = new ObjectId();

  @IsString()
  readonly name: string;

  @IsString()
  readonly phoneNumber: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  password: string;
  @IsOptional()
  passwordHash: string;
  @IsOptional()
  passwordSalt: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;

  createdAt: string = moment().format();
  updatedAt: string = moment().format();
  lastLoginAt: string = moment().format();
  @IsOptional()
  @IsString()
  tokenKey: string;
}
