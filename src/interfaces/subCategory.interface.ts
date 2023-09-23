import { ICategory } from './category.interface';
import { IProduct } from './product.interface';

export interface ISubCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: ICategory;
  products: IProduct[];
}
