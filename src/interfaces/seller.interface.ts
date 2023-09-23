import { IProduct } from './product.interface';
import { IUser } from './user.interface';

export interface ISeller {
  id: string;
  image: string;
  name: string;
  phone: string;
  gender: string;
  dob: Date;
  address: string;
  companyName: string;
  companyLogo: string;
  companyAddress: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: IUser;
  products: IProduct[];
}
