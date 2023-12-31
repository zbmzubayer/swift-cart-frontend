import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import RootLayout from '@/layouts/RootLayout/RootLayout';
import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProductDetails from '@/pages/ProductDetails';
import Products from '@/pages/Products';
import Profile from '@/pages/Profile';
import SignUp from '@/pages/SignUp';
import Support from '@/pages/Support';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminPage from '@/pages/admin/AdminPage';
import OrderListPage from '@/pages/admin/OrderListPage';
import ProductListPage from '@/pages/admin/ProductListPage';
import UsersListPage from '@/pages/admin/UserListPage';
import { createBrowserRouter } from 'react-router-dom';
import AdminPrivateRoutes from './adminPrivateRoutes';
import PrivateRoutes from './privateRoutes';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'support', element: <Support /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <NotFound /> },
      {
        path: 'customer',
        element: <PrivateRoutes />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'checkout', element: <Checkout /> },
        ],
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <AdminPage /> },
      { path: '*', element: <NotFound /> },
      {
        path: '',
        element: <AdminPrivateRoutes />,
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'users', element: <UsersListPage /> },
          { path: 'products', element: <ProductListPage /> },
          { path: 'orders', element: <OrderListPage /> },
        ],
      },
    ],
  },
]);

export default routes;
