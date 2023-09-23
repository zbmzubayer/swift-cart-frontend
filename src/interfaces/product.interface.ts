import { IReview } from './reviews.interface';
import { ISeller } from './seller.interface';

export interface IProduct {
  id: string;
  image: string;
  url: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  soldCount: number;
  status: string;
  warranty: string;
  createdAt: string;
  updatedAt: string;
  subCategory: string;
  seller?: ISeller;
  reviews?: IReview[];
  quantity?: number;
}
