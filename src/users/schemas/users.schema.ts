import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: String,
  identifier: Number,
  cellphone: Number,
  shopName: String,
  role: Number,
  resetPwdPing: String,
  resetPingUsed: Boolean,
  resetPwdToken: String,
  isShopInfo: Boolean,
});
