import LoadingScreen from '@/components/LoadingScreen';
import { useAppSelector } from '@/redux/hook';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminPrivateRoutes() {
  const { user, isLoading } = useAppSelector(state => state.auth);

  if (isLoading) return <LoadingScreen />;

  return user && user?.admin && !isLoading ? <Outlet /> : <Navigate to="/admin" />;
}
