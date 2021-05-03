import { Document } from 'mongoose';

export interface Service extends Document {
  readonly name: string;
  readonly description: string;
  readonly deliveryTime: string;
  readonly attentionHours: string;
  readonly availableType: number;
  readonly location: Object;
  readonly address: string;
  readonly districtAvailable: any[];
  readonly priceType: number;
  readonly price: Object;
  readonly imageService: any[];
  readonly createdAt: Date;
  readonly userId: string;
  readonly isAvailable: Boolean;
}
