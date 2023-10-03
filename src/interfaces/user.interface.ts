import { ICustomer, ISeller } from '.';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  customer?: ICustomer;
  seller?: ISeller;
}
