import About from '@/pages/About';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import SignUp from '@/pages/SignUp';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout/RootLayout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'my-profile',
        element: <Profile />,
      },
    ],
  },
]);

export default routes;
