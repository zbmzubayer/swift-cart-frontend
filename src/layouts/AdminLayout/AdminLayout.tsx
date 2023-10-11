import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/theme-provider';
import useAuth from '@/hooks/useAuth';
import { Outlet } from 'react-router-dom';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  const { isLoading } = useAuth();

  if (isLoading) return <div className="loader"></div>;
  return (
    <>
      <ThemeProvider>
        <AdminHeader />
        <main className="container min-h-screen">
          <Outlet />
          <Toaster />
        </main>
        <AdminFooter />
      </ThemeProvider>
    </>
  );
}
