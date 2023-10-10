import DataTable from '@/components/DataTable/DataTable';
import { orderColumns } from '@/components/DataTable/Order/OrderColumns';
import { orderFilterFields } from '@/constants/filterFields';
import { IOrder } from '@/interfaces';
import { useGetOrdersQuery } from '@/redux/features/order/orderApi';

export default function OrderListPage() {
  const { data, isLoading } = useGetOrdersQuery(undefined);

  let orders = [];
  if (data?.data.length) {
    orders = data?.data.map((order: IOrder) => {
      return { ...order };
    });
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="py-10">
      <div className="space-y-5 border-2 border-amber-900 p-3 rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl  font-bold tracking-tight">Product Data Grid</h1>
          <p className="text-muted-foreground">List of all products</p>
        </div>
        <DataTable columns={orderColumns} data={orders} filterFields={orderFilterFields} />
      </div>
    </div>
  );
}
