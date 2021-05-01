import { Test, TestingModule } from '@nestjs/testing';
import { OrdersServicesController } from './orders-services.controller';

describe('OrdersServices Controller', () => {
  let controller: OrdersServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersServicesController],
    }).compile();

    controller = module.get<OrdersServicesController>(OrdersServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
