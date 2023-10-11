import LoadingScreen from '@/components/LoadingScreen';
import { Toaster } from '@/components/ui/toaster';
import useAuth from '@/hooks/useAuth';
import { getCart } from '@/redux/features/cart/cartSlice';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import { useAppDispatch } from '@/redux/hook';
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

  const { isLoading } = useAuth();

  if (isLoading || isFetching) return <LoadingScreen />;
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
