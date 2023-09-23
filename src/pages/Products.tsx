import ProductCard from '@/components/Cards/ProductCard';
import ProductFilterBar from '@/components/ProductFilterBar';
import { IProduct } from '@/interfaces/product.interface';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import { useAppSelector } from '@/redux/hook';

export default function Products() {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const { inStock, priceRange } = useAppSelector(state => state.product);

  let products: IProduct[] = [];
  if (inStock) {
    products = data?.data.filter((product: IProduct) => product.stock > 0 && product.price <= priceRange);
  } else if (priceRange > 0) {
    products = data?.data.filter((product: IProduct) => product.price <= priceRange);
  }

  if (isLoading) return <div className="text-center">Loading...</div>;
  return (
    <div className="mt-5 flex flex-col justify-between lg:flex-row">
      <div className="mb-5">
        <ProductFilterBar />
      </div>
      <div className="grid grid-cols-2 gap-2 gap-y-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="flex items-center justify-center h-[60vh] w-[80vw] mx-auto">
          <h2 className="text-2xl font-bold">No products found</h2>
        </div>
      )}
    </div>
  );
}
