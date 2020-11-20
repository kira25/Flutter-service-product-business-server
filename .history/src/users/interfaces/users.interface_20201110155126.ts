import { Document } from 'mongoose';

export interface User extends Document {
  readonly id?: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly password: string;
  readonly email: string;
  readonly identifier: string;
  readonly cellphone: string;
  readonly shopName: string;
  readonly role: number;
}
