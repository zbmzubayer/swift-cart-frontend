import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

interface Props {
  title?: string;
  className?: string;
}

export function ButtonLoading({ title, className }: Props) {
  return (
    <Button className={className} disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      {title}
    </Button>
  );
}
