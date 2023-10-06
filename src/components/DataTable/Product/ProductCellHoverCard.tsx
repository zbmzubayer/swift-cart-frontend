import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { IProduct } from '@/interfaces';
import { CalendarIcon, UserCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCellHoverCard({ data }: { data: IProduct }) {
  const {
    id,
    image,
    name,
    description,
    price,
    soldCount,
    status,
    stock,
    warranty,
    seller,
    subCategory,
    createdAt,
    updatedAt,
  } = data;
  const createdDate = new Date(createdAt).toUTCString();
  const updatedDate = new Date(updatedAt).toUTCString();
  let sellerDob = null;
  if (seller?.dob) {
    sellerDob = new Date(seller.dob).toDateString();
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant={'link'}>{id}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex justify-between space-x-4">
          <div className="flex-shrink-0">
            {image ? (
              <img className="h-20 w-20 rounded-full" src={image} alt="user photo" />
            ) : (
              <UserCircleIcon className="h-16 w-16 rounded-full" />
            )}
          </div>
          <div className="space-y-1">
            <div>
              <h4 className="text-base font-semibold">{name}</h4>
              <Link to="#" className="text-muted-foreground underline-offset-2 hover:underline">
                {seller?.companyName}
              </Link>
            </div>
            <div className="text-sm">
              <p>Gender: {seller?.gender || 'N/A'}</p>
              <p> Date of birth: {sellerDob || 'N/A'}</p>
              <p>Phone: {seller?.phone}</p>
              <p>Address: {seller?.address || 'N/A'}</p>
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
