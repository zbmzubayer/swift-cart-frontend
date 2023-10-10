import { IOrderItem } from '.';

export interface IOrder {
  id: string;
  code: string;
  total: number;
  status: string;
  address: string;
  phone: string;
  deliveredAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
  orderItems: IOrderItem[];
}
