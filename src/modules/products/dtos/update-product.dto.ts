import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import * as moment from 'moment';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  readonly barcode?: number;

  @IsOptional()
  @IsString()
  readonly brand?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly available?: boolean;

  @IsOptional()
  @IsString()
  updatedAt: string = moment().format();
}
