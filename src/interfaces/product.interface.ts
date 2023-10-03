import { IReview } from './review.interface';
import { ISeller } from './seller.interface';
import { ISubCategory } from './subCategory.interface';

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
  subCategory?: ISubCategory;
  seller?: ISeller;
  reviews?: IReview[];
  quantity?: number;
}
