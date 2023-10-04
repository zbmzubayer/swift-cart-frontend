import { IUser } from '.';

export interface IAdmin {
  id: string;
  image: string;
  name: string;
  phone: string;
  gender: string;
  dob: Date;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: IUser;
}
