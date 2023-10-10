export interface IOrderItem {
  id: string;
  quantity: number;
  orderPrice: number;
  itemTotal: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  productId: string;
}
