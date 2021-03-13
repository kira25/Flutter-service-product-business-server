import { Schema } from 'mongoose';

export const ordersProductsSchema = new Schema({
  clientId: String,
  clientName: String,
  clientAddress: String,
  clientCellphone: String,
  amountProducts: Number,
  sellerId: String,
  totalPrice: Number,
  orderId: String,
  selectedProducts: [
    {
      amount: Number,
      color: Number,
      size: Number,
      price: Number,
      productId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
