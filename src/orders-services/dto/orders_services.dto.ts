export class CreateOrderServiceDTO {
  clientId: string;
  clientName: string;
  clientAddress: string;
  clientCellphone: string;
  sellerId: string;
  serviceId: string;
  orderState: number;
}

export class UpdateOrderServiceDTO {
  orderState: number;
}
