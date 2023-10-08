import { useAppSelector } from '@/redux/hook';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  const { user, isLoading } = useAppSelector(state => state.auth);

  if (isLoading) return <div className="loader"></div>;

  return user && user?.customer && !isLoading ? <Outlet /> : <Navigate to="/login" />;
}
