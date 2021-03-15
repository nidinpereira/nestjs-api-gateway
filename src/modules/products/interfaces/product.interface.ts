import { Document } from 'mongoose';
import { ProductReview } from '../../product-reviews/interfaces/product-review.interface';

export class Product extends Document {
  readonly _id: string;
  readonly name: string;
  readonly barcode: number;
  readonly brand: string;
  readonly description: string;
  readonly available: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  reviews?: ProductReview[];
}
