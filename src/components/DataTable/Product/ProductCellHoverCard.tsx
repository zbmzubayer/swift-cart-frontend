import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { IProduct } from '@/interfaces';
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCellHoverCard({ data }: { data: IProduct }) {
  const { id, image, name, seller, subCategory, createdAt, updatedAt } = data;
  const createdDate = new Date(createdAt).toUTCString();
  const updatedDate = new Date(updatedAt).toUTCString();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant={'link'}>{id}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[450px]">
        <div className="flex justify-between space-x-4">
          <div className="flex-shrink-0 flex justify-center items-center p-1 bg-white rounded-md border">
            <img className="h-28 w-28 object-contain" src={image} alt="user photo" />
          </div>
          <div className="space-y-1">
            <div>
              <h4 className="text-base font-semibold">{name}</h4>
              <Link to="#" className="underline-offset-2 hover:underline">
                {seller?.companyName}
              </Link>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <p>{subCategory?.category?.name}</p>
              <ChevronRight className="h-4 w-4" />
              <p>{subCategory?.name}</p>
            </div>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Created: {createdDate}</span>
            </div>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Updated: {updatedDate}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
