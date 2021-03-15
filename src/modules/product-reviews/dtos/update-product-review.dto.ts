import { IsString, IsOptional } from 'class-validator';
import * as moment from 'moment';

export class UpdateProductReviewDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly review?: string;

  @IsOptional()
  @IsString()
  updatedAt: string = moment().format();
}
