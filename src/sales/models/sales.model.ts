import * as mongoose from 'mongoose';

export const SalesSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  isApproved: { type: Boolean, required: true, default: false }
}, { timestamps: true });
