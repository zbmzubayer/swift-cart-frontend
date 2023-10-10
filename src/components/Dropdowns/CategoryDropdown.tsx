import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ICategory, ISubCategory } from '@/interfaces';
import { useGetCategoriesQuery } from '@/redux/features/category/categoryApi';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CategoryDropdown() {
  const { data, isLoading } = useGetCategoriesQuery(undefined);
  let categories: ICategory[] = [];
  if (!isLoading && data?.data) categories = data?.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MenuIcon className="h-6 w-6 mr-2 text-yellow-900" />
          <span className="text-base font-semibold">Category</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel className="text-amber-900">All Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories?.map((category: ICategory) =>
          category?.subCategories.length ? (
            <DropdownMenuSub key={category.id}>
              <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {category?.subCategories?.map((subcategory: ISubCategory) => (
                  <DropdownMenuItem asChild key={subcategory.id}>
                    <Link to={`/sub-category/${subcategory.id}`}>{subcategory.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem key={category.id}>{category.name}</DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
