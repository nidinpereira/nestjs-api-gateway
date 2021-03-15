import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  phoneNumber: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  role: String,
  createdAt: String,
  updatedAt: String,
  lastLoginAt: String,
  tokenKey: String,
});
