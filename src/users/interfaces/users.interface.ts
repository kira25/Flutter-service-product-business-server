import { Document } from 'mongoose';

export interface User extends Document {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  identifier: string;
  cellphone: string;
  shopName: string;
  role: number;
  resetPwdPing: string;
  resetPingUsed: boolean;
  resetPwdToken: string;
}
