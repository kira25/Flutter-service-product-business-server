import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

//DEFINE LO QUE SE ESCRIBIRA EN EL CODIGO
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
  async getProduct(productID: string): Promise<Product> {
    const products = await this.productModel.findById(productID);
    return products;
  }
  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }
  async updateProduct(
    product: CreateProductDTO,
    productID: string,
  ): Promise<Product> {
    const updatedProduct = this.productModel.findByIdAndUpdate(
      productID,
      product,
    );
    return await updatedProduct;
  }
  async deleteProduct(productID: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }
}
