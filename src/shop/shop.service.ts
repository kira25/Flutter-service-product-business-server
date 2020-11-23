import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/users.interface';
import { Shop } from './interfaces/shop';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('shop') private shopModel: Model<Shop>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async addShopInfo(body: any, data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const id = user.id;
    body.userId = id;
    body.title = user.shopName;
    const shop = await this.shopModel.findOne({ title: body.title });
    if (shop) return { ok: false, response: 'No user found' };

    const newShop = new this.shopModel(body);
    console.log(newShop);
    newShop.save();
    return { ok: true, newShop };
  }

  async addPhotoBankAccount(body: any, data: any) {
    console.log(data);
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    const shopname = user.shopName;
    if (!user) return { ok: false, response: 'No user found' };

    const shop = this.shopModel.findOne({ title: shopname });
    if (!shop) return { ok: false, response: 'No shop found' };

    const shopUpdated = await this.shopModel.findOneAndUpdate(
      { title: shopname },
      body,
      {
        new: true,
        useFindAndModify: false,
      },
    );
    return { ok: true, shopUpdated };
  }
}
