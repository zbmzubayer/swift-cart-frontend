import { ISubCategory } from './subCategory.interface';

export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  subCategories: ISubCategory[];
}
