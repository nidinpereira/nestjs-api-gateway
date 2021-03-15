import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export class User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  @Exclude()
  passwordHash: string;
  @Exclude()
  passwordSalt: string;
  readonly role: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastLoginAt: string;
  readonly tokenKey: string;
}
