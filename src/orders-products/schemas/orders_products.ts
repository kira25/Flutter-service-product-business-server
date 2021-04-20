import { Schema } from 'mongoose';
import { ORDER_PRODUCT_STAGE } from 'src/common/enum';

export const ordersProductsSchema = new Schema({
  clientId: String,
  clientName: String,
  clientAddress: String,
  clientCellphone: String,
  amountProducts: Number,
  sellerId: String,
  totalPrice: Number,
  orderId: String,
  deliveryType: Number,
  deliveryId: String,
  selectedProducts: [
    {
      amount: Number,
      color: Number,
      size: Number,
      price: Number,
      productId: String,
      accepted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  orderState: {
    type: Number,
    default: ORDER_PRODUCT_STAGE.PENDING,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
