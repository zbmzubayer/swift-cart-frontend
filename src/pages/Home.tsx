import { AccountDropdown } from '@/components/AccountDropdown';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <AccountDropdown />
      <Link to="/login" className={cn(buttonVariants())}>
        Click here
      </Link>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
