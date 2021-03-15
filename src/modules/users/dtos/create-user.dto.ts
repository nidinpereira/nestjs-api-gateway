import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../../enums/userRole.enum';
import * as moment from 'moment';
import { ObjectId } from 'mongodb';

export class CreateUserDto {
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
  tokenKey?: string;
}
