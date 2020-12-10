import { Schema } from 'mongoose';

export const productSchema = new Schema({
  name: { type: String, required: true },
  userId: String,
  description: String,
  productCategory: { category: Number, subcategory: Number },
  stockType: Number,
  amountStock: Number,
  stock: [
    {
      color: Number,
      quantity: Number,
      sizeProduct: [
        {
          size: Number,
          sizeQuantity: Number,
        },
      ],
    },
  ],
  priceType: Number,

  price: {
    normalPrice: Number,
    offertPrice: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageProduct: [
    {
      product: String,
    },
  ],
  // aditionalImage : [
  //   {
  //     product: String
  //   }
  // ]
});

//Nombre
//Descripcion
//Categoria [Hogar,Hombre,Infanitl, Mascotas,Mujer,Restaurantes,Salud,Tecnologia[baño,cocina,decoracion,electrohogar,mujer, muebles,plantas] ]
//Stock [Unico,por color, por talla, por color y talla]
//Administra stock [ [color,stock], [color2,stock2]  ]
//Tipo de Precio [normal, oferta]
//Precio [ normal , oferta]
//Fotos del producto [ maximo 5 fotos]
