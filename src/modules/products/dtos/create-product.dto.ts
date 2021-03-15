import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';
import { ObjectId } from 'mongodb';

export class CreateProductDto {
  @IsOptional()
  readonly _id: ObjectId = new ObjectId();

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly barcode: number;

  @IsString()
  readonly brand: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly available: boolean;

  @IsOptional()
  @IsString()
  createdAt: string = moment().format();

  @IsOptional()
  @IsString()
  updatedAt: string = moment().format();
}
