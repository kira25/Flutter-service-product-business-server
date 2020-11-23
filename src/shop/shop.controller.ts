import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Put,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createShopInfo(@Body() shop, @Request() resp) {
    const newShop = this.shopService.addShopInfo(shop, resp.user);
    return newShop;
  }
  @Put('/update')
  @UseGuards(JwtAuthGuard)
  updateShopInfo(@Body() shop, @Request() resp) {
    const newShop = this.shopService.addPhotoBankAccount(shop, resp.user);
    return newShop;
  }
}
