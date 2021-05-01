import { Test, TestingModule } from '@nestjs/testing';
import { OrdersServicesService } from './orders-services.service';

describe('OrdersServicesService', () => {
  let service: OrdersServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersServicesService],
    }).compile();

    service = module.get<OrdersServicesService>(OrdersServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
