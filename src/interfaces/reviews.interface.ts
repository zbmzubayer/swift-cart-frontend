import { IProduct } from './product.interface';

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  product?: IProduct;
}
