import { ISeller } from './seller.interface';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  seller?: ISeller;
}
