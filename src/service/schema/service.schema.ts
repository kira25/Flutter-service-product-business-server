import { Schema } from 'mongoose';

export const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  deliveryTime: String,
  attentionHours: String,
  availableType: Number,
  location: {
    department: Number,
    city: Number,
    district: Number,
  },
  address: String,
  districtAvailable: [
    {
      district: Number,
    },
  ],
  price: {
    normalPrice: Number,
    offertPrice: Number,
  },
  imageService: [
    {
      service: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: String,
  isAvailable : Boolean,
});


/* tienda /domicilio

location-address-districtavailable
----------------------
tienda

location-address
--------------------------
domicilio

districtavailable*/