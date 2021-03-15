import { IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';
import { ObjectId } from 'mongodb';

export class CreateProductReviewDto {
  @IsOptional()
  readonly _id: ObjectId = new ObjectId();

  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  readonly review: string;

  @IsOptional()
  @IsString()
  createdAt: string = moment().format();

  @IsOptional()
  @IsString()
  updatedAt: string = moment().format();

  @IsOptional()
  @IsString()
  userId: string;

  @IsString()
  readonly productId: string;
}
