import LoadingScreen from '@/components/LoadingScreen';
import { useAppSelector } from '@/redux/hook';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoutes() {
  const { user, isLoading } = useAppSelector(state => state.auth);
  const { pathname } = useLocation();

  if (isLoading) return <LoadingScreen />;

  return user && user?.customer && !isLoading ? <Outlet /> : <Navigate to="/login" state={{ path: pathname }} />;
}
