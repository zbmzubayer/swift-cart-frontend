import DataTable from '@/components/DataTable/DataTable';
import { columns } from '@/components/DataTable/UserColumns';
import { IUser } from '@/interfaces';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';

export default function UserListPage() {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  let users = [];
  if (data?.data.length) {
    users = data?.data.map((user: IUser) => {
      if (user.role === 'SuperAdmin') {
        return { ...user?.admin, ...user };
      } else if (user.role === 'Admin') {
        return { ...user?.admin, ...user };
      } else if (user.role === 'Customer') {
        return { ...user?.customer, ...user };
      } else if (user.role === 'Seller') {
        return { ...user?.seller, ...user };
      }
    });
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-10">
      <div className="space-y-5 border-2 border-amber-900 p-3 rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl  font-bold tracking-tight">User Data Grid</h1>
          <p className="text-muted-foreground">List of all users</p>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
