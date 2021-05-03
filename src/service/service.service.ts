import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './interface/service.interface';
import { User } from '../users/interfaces/users.interface';
import { CreateServiceDTO, UpdateServiceDTO } from './dto/service.dto';
import { AppGateway } from 'src/app.gateway';
@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<Service>,
    @InjectModel('User') private userModel: Model<User>,
    private gateway: AppGateway,
  ) {}

  async getProducts() {
    const service = await this.serviceModel.find();
    return { ok: true, service };
  }

  async getServicesById(id: String) {
    const service = await this.serviceModel.findById(id);
    return service;
  }

  async getProductUser(data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const service = await this.serviceModel.find({ userId: user.id });
    if (service.length == 0)
      return { ok: false, response: 'No service for this user' };
    return {
      ok: true,
      service,
    };
  }

  async createService(createServiceDTO: CreateServiceDTO, data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const service = await this.serviceModel.findOne({
      name: createServiceDTO.name,
    });
    if (service) return { ok: false, response: 'Service already exist' };
    createServiceDTO.userId = user.id;
    createServiceDTO.isAvailable = true;

    const newService = new this.serviceModel(createServiceDTO);
    await newService.save();
    return {
      ok: true,
      newService,
    };
  }

  async deleteService(productID: any) {
    const product = await this.serviceModel.findById(productID);
    console.log(product);
    if (!product) return { ok: false, response: 'Product not exist' };
    const deletedProduct = await this.serviceModel.findByIdAndDelete(productID);
    return { ok: true, deletedProduct };
  }

  async updateService(
    updateServiceDto: UpdateServiceDTO,
    id: string,
    data: any,
  ) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const newService = await this.serviceModel.findById(id);
    if (!newService) return { ok: false, response: 'Service not exist' };
    const updateService = await this.serviceModel.findByIdAndUpdate(
      id,
      {
        deliveryTime: updateServiceDto.deliveryTime,
        attentionHours: updateServiceDto.attentionHours,
        availableType: updateServiceDto.availableType,
        location: updateServiceDto.location,
        address: updateServiceDto.address,
        priceType: updateServiceDto.priceType,
        districtAvailable: updateServiceDto.districtAvailable,
        price: updateServiceDto.price,
      },
      { new: true, useFindAndModify: false },
    );
    return { ok: true, updateService };
  }

  async addImageServices(body: any, data: any, id: any) {
    console.log('addImageServices');
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };

    const newService = await this.serviceModel.findById(id);
    if (!newService) return { ok: false, response: 'Service not exist' };

    const serviceImageUpdated = await this.serviceModel.findByIdAndUpdate(
      id,
      {
        imageService: [
          {
            service:
              typeof body.imageService1 == 'undefined'
                ? null
                : body.imageService1[0].location,
          },
          {
            service:
              typeof body.imageService2 == 'undefined'
                ? null
                : body.imageService2[0].location,
          },
          {
            service:
              typeof body.imageService3 == 'undefined'
                ? null
                : body.imageService3[0].location,
          },
          {
            service:
              typeof body.imageService4 == 'undefined'
                ? null
                : body.imageService4[0].location,
          },
          {
            service:
              typeof body.imageService5 == 'undefined'
                ? null
                : body.imageService5[0].location,
          },
        ],
      },
      {
        new: true,
        useFindAndModify: false,
      },
    );
    return { ok: true, serviceImageUpdated };
  }

  async updateAvailable(data: any, id: string, serviceDTO: UpdateServiceDTO) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };

    const serviceById = await this.serviceModel.findById(id);
    if (!serviceById) return { ok: false, response: 'Service not exist' };

    const newService = await this.serviceModel.findByIdAndUpdate(
      id,
      {
        isAvailable: serviceDTO.isAvailable,
      },
      {
        new: true,
        useFindAndModify: false,
      },
    );
    return {ok: true, newService};
  }
}
