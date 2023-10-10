import CartCard from '@/components/Cards/CartCard';
import { useAppSelector } from '@/redux/hook';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { products, total } = useAppSelector(state => state.cart);
  return (
    <div className="flex justify-between mt-5">
      <div className="">
        <h1 className="text-2xl font-semibold mb-5">Shopping cart</h1>
        {products.length > 0 ? (
          <div className="space-y-5">
            {products.map(product => (
              <CartCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold">Cart is empty</h1>
          </div>
        )}
      </div>
      <div className="mt-10 space-y-5 flex flex-col items-end">
        <p className="text-lg font-medium">Total items: {products?.length}</p>
        <p className="text-xl font-medium">Total Amount: ${total}</p>
        <Link
          to="/customer/checkout"
          className="inline-block px-5 py-2 rounded-md bg-amber-700 text-white float-right hover:bg-amber-800"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
