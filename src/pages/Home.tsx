import { AccountDropdown } from '@/components/AccountDropdown';
import { ButtonLoading } from '@/components/Buttons/ButtonLoading';
import { useAppSelector } from '@/redux/hook';

export default function Home() {
  const { user } = useAppSelector(state => state.auth);
  return (
    <div>
      <div>{user?.email}</div>
      <ButtonLoading title="Loading" />

      <div>
        <p className="animate-spin w-5 h-5">HI</p>
      </div>
      <AccountDropdown />
    </div>
  );
}
