export interface IPayments {
  id: number;
  title: string;
}

export interface IDeliveries extends IPayments {
  price: string;
}

export interface IOrderInformation {
  name: string;
  address: string;
  phone: string;
  email: string;
  deliveryTypeId: number;
  paymentTypeId: number;
  comment: string;
}

export interface IBasketStore {
  id: number;
  items: Array<unknown>;
  order: null | Record<string, any>;
  deliveries: IDeliveries[];
  payments: IPayments[];
  user: {
    id: number;
    accessKey: string;
  };
}
