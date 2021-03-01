import { Schema } from 'mongoose';

export const ordersProductsSchema = new Schema({
  amountProducts: Number,
  clientId: String,
  clientName: String,
  clientAddress: String,
  clientCellphone: String,
  sellerId: String,
  totalPrice: Number,
  orderId: String,
  products: [
    {
      amount: Number,
      productId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
