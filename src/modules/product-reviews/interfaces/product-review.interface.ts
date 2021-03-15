import { Document } from 'mongoose';

export class ProductReview extends Document {
  readonly _id: string;
  readonly name: string;
  readonly barcode: number;
  readonly brand: string;
  readonly description: string;
  readonly available: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly userId: string;
  readonly productId: string;
}
