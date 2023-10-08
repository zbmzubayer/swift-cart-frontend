import AdminLoginForm from '@/components/Forms/AdminLoginForm';

export default function AdminPage() {
  return (
    <div className="flex justify-center items-center gap-20 min-h-[85vh]">
      <h1 className="text-4xl font-bold tracking-tight">Swift Cart Admin Portal</h1>
      <AdminLoginForm />
    </div>
  );
}
