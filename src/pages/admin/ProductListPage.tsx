import DataTable from '@/components/DataTable/DataTable';
import { productColumns } from '@/components/DataTable/Product/ProductColumns';
import { productFilterFields } from '@/constants/filterFields';
import { IProduct } from '@/interfaces';
import { useGetProductsQuery } from '@/redux/features/product/productApi';

export default function ProductListPage() {
  const { data, isLoading } = useGetProductsQuery(undefined);

  let products = [];
  if (data?.data.length) {
    products = data?.data.map((product: IProduct) => {
      return { ...product, companyName: product?.seller?.companyName };
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
        <DataTable columns={productColumns} data={products} filterFields={productFilterFields} />
      </div>
    </div>
  );
}
