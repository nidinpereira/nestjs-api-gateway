import * as mongoose from 'mongoose';

export const ProductReviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  barcode: Number,
  brand: String,
  description: String,
  available: Boolean,
  createdAt: String,
  updatedAt: String,
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
});
