import { Toaster } from '@/components/ui/toaster';
import { setLoading, setUser } from '@/redux/features/auth/authSlice';
import { useGetUserByIdQuery } from '@/redux/features/user/userApi';
import { useAppDispatch } from '@/redux/hook';
import { getUserByToken } from '@/services/auth.service';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function RootLayout() {
  let userId = null;
  const tokenPayload = getUserByToken();
  if (tokenPayload) userId = tokenPayload.id;
  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, { skip: !userId });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    if (isError) dispatch(setLoading(false));
  }, [dispatch, isError]);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUser(data?.data));
      dispatch(setLoading(false));
    }
  }, [data, isLoading, dispatch]);

  if (isLoading) return <div className="loader"></div>;

  return (
    <>
      <Header />
      <main className="container min-h-screen">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  );
}
