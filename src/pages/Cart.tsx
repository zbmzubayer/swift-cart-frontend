import CartCard from '@/components/Cards/CartCard';
import { useAppSelector } from '@/redux/hook';

export default function Cart() {
  const { products, total } = useAppSelector(state => state.cart);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Shopping cart</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold">Cart is empty</h1>
        </div>
      )}
      <p>Total: {total}</p>
    </div>
  );
}
