import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly description: string;
  readonly productCategory: Object;
  readonly stockType: number;
  readonly stock: any[];
  readonly priceType: number;
  readonly price: Object;
  readonly imageProduct: any[];
  readonly createdAt: Date;
  readonly userId: string;
  readonly amountStock: number;
}
