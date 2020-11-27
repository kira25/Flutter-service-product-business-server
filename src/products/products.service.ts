import { Injectable, Request } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
import { User } from 'src/users/interfaces/users.interface';

//DEFINE LO QUE SE ESCRIBIRA EN EL CODIGO
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
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

    const newProduct = new this.productModel(createProductDTO);
    await newProduct.save();
    return {
      ok: true,
      newProduct,
    };
  }

  async updateProduct(
    product: CreateProductDTO,
    productID: string,
  ): Promise<Product> {
    const updatedProduct = this.productModel.findByIdAndUpdate(
      productID,
      product,
      { new: true },
    );
    return await updatedProduct;
  }
  async deleteProduct(productID: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }
}
