import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/users.interface';
import { Shop } from './interfaces/shop.interface';

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
    await this.userModel.findOneAndUpdate(
      { email: email },
      {
        isShopInfo: true,
      },
      { useFindAndModify: true },
    );
    const id = user.id;
    body.userId = id;
    body.title = user.shopName;
    body.email = user.email;
    const shop = await this.shopModel.findOne({ title: body.title });
    if (shop) return { ok: false, response: 'Shop already exist' };

    const newShop = new this.shopModel(body);
    console.log(newShop);
    newShop.save();
    console.log(newShop);
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
      {
        profilePhoto:
          body.profilePhoto == undefined
            ? ''
            : body.profilePhoto[0].location,
        profileTitle:
          body.profileTitle == undefined
            ? ''
            : body.profilePhoto[1].location,
      },
      {
        new: true,
        useFindAndModify: false,
      },
    );
    return { ok: true, shopUpdated };
  }

  async getShopInfo(data: any) {
    const email = data.email;
    const shop = await this.shopModel.findOne({ email: email });
    if (!shop) return { ok: false, response: 'No shop found' };

    return {
      ok: true,
      shop,
    };
  }
}
