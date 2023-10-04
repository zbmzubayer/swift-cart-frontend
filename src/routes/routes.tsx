import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ProductDetails from '@/pages/ProductDetails';
import Products from '@/pages/Products';
import Profile from '@/pages/Profile';
import SignUp from '@/pages/SignUp';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout/RootLayout';
import PrivateRoutes from './privateRoutes';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <h1>404</h1> },
      {
        path: '/',
        element: <PrivateRoutes />,
        children: [
          { path: 'my-profile', element: <Profile /> },
          { path: 'settings', element: <h1>Settings</h1> },
        ],
      },
    ],
  },
]);

export default routes;
