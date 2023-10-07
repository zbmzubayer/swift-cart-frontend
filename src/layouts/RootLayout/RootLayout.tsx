import { Toaster } from '@/components/ui/toaster';
import { setLoading, setUser } from '@/redux/features/auth/authSlice';
import { getCart } from '@/redux/features/cart/cartSlice';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import { useGetUserByIdQuery } from '@/redux/features/user/userApi';
import { useAppDispatch } from '@/redux/hook';
import { getUserByToken } from '@/services/auth.service';
import { getCartFromLocalStorage } from '@/services/cartService';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function RootLayout() {
  const { data: productData, isLoading: isFetching } = useGetProductsQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetching) dispatch(getCart(getCartFromLocalStorage(productData?.data)));
  }, [isFetching, productData?.data, dispatch]);

  let userId = null;
  const tokenPayload = getUserByToken();
  if (tokenPayload) userId = tokenPayload.id;
  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, { skip: !userId });

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
      <Header />
      <main className="container min-h-screen">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  );
}
