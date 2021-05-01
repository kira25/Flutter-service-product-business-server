import { Schema } from 'mongoose';
import { ORDER_SERVICE_STAGE } from 'src/common/enum';

export const ordersServiceSchema = new Schema({
  clientId: String,
  clientName: String,
  clientAddress: String,
  clientCellphone: String,
  sellerId: String,
  serviceId: String,
  orderState: {
    type: Number,
    default: ORDER_SERVICE_STAGE.COORDINATE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
