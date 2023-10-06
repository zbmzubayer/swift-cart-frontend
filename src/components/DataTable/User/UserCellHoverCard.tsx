import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CalendarIcon, UserCircleIcon } from 'lucide-react';
import { AllUser } from './UserColumns';

export default function UserCellHoverCard({ data }: { data: AllUser }) {
  const { id, image, email, role, name, phone, gender, dob, address, createdAt } = data;
  const createdDate = new Date(createdAt).toUTCString();
  let userDob = null;
  if (dob) {
    userDob = new Date(dob).toDateString();
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
              <a href={`mailto:${email}`} className="text-muted-foreground underline-offset-2 hover:underline">
                {email}
              </a>
            </div>
            <div className="text-sm">
              <p>Role: {role}</p>
              <p>Gender: {gender || 'N/A'}</p>
              <p> Date of birth: {userDob || 'N/A'}</p>
              <p>Phone: {phone}</p>
              <p>Address: {address || 'N/A'}</p>
            </div>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined {createdDate}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
