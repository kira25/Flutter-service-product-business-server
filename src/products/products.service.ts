import { Injectable, Request } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { User } from 'src/users/interfaces/users.interface';

//DEFINE LO QUE SE ESCRIBIRA EN EL CODIGO
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async getProducts() {
    const products = await this.productModel.find();
    return { ok: true, products };
  }
  async getProduct(productID: string): Promise<Product> {
    const products = await this.productModel.findById(productID);
    return products;
  }

  //GET PRODUCTS BY USER
  async getProductUser(data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const product = await this.productModel.find({ userId: user.id });
    if (product.length == 0)
      return { ok: false, response: 'No products for this user' };
    return {
      ok: true,
      product,
    };
  }

  async createProduct(createProductDTO: CreateProductDTO, data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const product = await this.productModel.findOne({
      name: createProductDTO.name,
    });
    if (product) return { ok: false, response: 'Product already exist' };
    createProductDTO.userId = user.id;
    let total = 0;
    total = createProductDTO.stock.reduce(
      (acc, curr) =>
        acc +
        (curr.quantity == null ? 0 : curr.quantity) +
        curr.sizeProduct.reduce(
          (acc2, currproduct) => currproduct.sizeQuantity + acc2,
          0,
        ),
      0,
    );
    createProductDTO.amountStock = total;

    const newProduct = new this.productModel(createProductDTO);
    await newProduct.save();
    return {
      ok: true,
      newProduct,
    };
  }

  async updateProduct(product: UpdateProductDTO, productID: string) {
    const newproduct = await this.productModel.findById(productID);
    if (!newproduct) return { ok: false, response: 'Product not exist' };
    let total = 0;
    total = product.stock.reduce(
      (acc, curr) =>
        acc +
        (curr.quantity == null ? 0 : curr.quantity) +
        curr.sizeProduct.reduce(
          (acc2, currproduct) => currproduct.sizeQuantity + acc2,
          0,
        ),
      0,
    );
    product.amountStock = total;
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      {
        stockType: product.stockType,
        priceType: product.priceType,
        price: product.price,
        stock: product.stock,
        amountStock: product.amountStock,
        
      },
      { new: true, useFindAndModify: false },
    );
    console.log('Product Updated');
    return { ok: true, updatedProduct };
  }
  async deleteProduct(productID: any) {
    const product = await this.productModel.findById(productID);
    console.log(product);
    if (!product) return { ok: false, response: 'Product not exist' };
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return { ok: true, deletedProduct };
  }

  async addImageProducts(body: any, data: any, id: any) {
    console.log('AddImageProducts');
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };

    const newProduct = await this.productModel.findById(id);
    if (!newProduct) return { ok: false, response: 'Product not exist' };

    const productImageUpdated = await this.productModel.findByIdAndUpdate(
      id,
      {
        imageProduct: [
          {
            product:
              typeof body.imageProduct1 == 'undefined'
                ? null
                : body.imageProduct1[0].location,
          },
          {
            product:
              typeof body.imageProduct2 == 'undefined'
                ? null
                : body.imageProduct2[0].location,
          },
          {
            product:
              typeof body.imageProduct3 == 'undefined'
                ? null
                : body.imageProduct3[0].location,
          },
          {
            product:
              typeof body.imageProduct4 == 'undefined'
                ? null
                : body.imageProduct4[0].location,
          },
          {
            product:
              typeof body.imageProduct5 == 'undefined'
                ? null
                : body.imageProduct5[0].location,
          },
        ],
      },
      {
        new: true,
        useFindAndModify: false,
      },
    );
    return { ok: true, productImageUpdated };
  }
}
