import { Document } from 'mongoose';

export interface Shop extends Document {
  title: string;
  id?: number;
  description: string;
  state: string;
  address: string;
  deliveryTime: string;
  whatsapp: number;
  social: any[];
  //PHOTO AND BANK
  profilePhoto: string;
  profileTitle: string;
  bankAccount: string;
  interbankAccount: string;
  userId: string;
  email: string;
}
//Para manejo interno del proyecto
