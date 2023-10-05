import { ThemeProvider } from '@/contexts/theme-provider';
import { setLoading, setUser } from '@/redux/features/auth/authSlice';
import { useGetUserByIdQuery } from '@/redux/features/user/userApi';
import { useAppDispatch } from '@/redux/hook';
import { getUserByToken } from '@/services/auth.service';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  let userId = null;
  const tokenPayload = getUserByToken();
  if (tokenPayload) userId = tokenPayload.id;
  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, { skip: !userId });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId!) dispatch(setLoading(true));
    if (isError) {
      dispatch(setLoading(false));
    }
  }, [userId, isError, dispatch]);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUser(data?.data));
      dispatch(setLoading(false));
    }
  }, [data, isLoading, dispatch]);

  if (isLoading) return <div className="loader"></div>;

  return (
    <>
      <ThemeProvider>
        <AdminHeader />
        <main className="container min-h-screen">
          <Outlet />
        </main>
        <AdminFooter />
      </ThemeProvider>
    </>
  );
}
