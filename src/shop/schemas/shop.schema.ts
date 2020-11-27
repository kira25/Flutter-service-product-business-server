import { Schema } from 'mongoose';

export const ShopSchema = new Schema({
  title: String,
  description: String,
  state: String,
  address: String,
  deliveryTime: String,
  userId: String,
  whatsapp: Number,
  social: [
    {
      name: String,
    },
  ],
  profilePhoto: String,
  profileTitle: String,
  bankAccount: String,
  interbankAccount: String,
  email: String,
});
