import { useAppSelector } from '@/redux/hook';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminPrivateRoutes() {
  const { user, isLoading } = useAppSelector(state => state.auth);

  if (isLoading) return <div className="loader"></div>;

  return user && user?.admin && !isLoading ? <Outlet /> : <Navigate to="/admin" />;
}
