import { IProduct } from '@/interfaces/product.interface';
import { addToCart, decreaseQuantity, removeFromCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface CartCardProps {
  product: IProduct;
}

export default function CartCard({ product }: CartCardProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="max-w-2xl h-[150px] p-2 bg-slate-300 border-2 border-gray-700 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="">
          <img
            src={product.image}
            alt={`${product.name} photo`}
            className="w-[150px] border rounded-sm object-contain"
          />
        </div>
        <div>
          <h2 className="text-container font-medium">{product.name}</h2>
          <p className="font-bold">${product.price}</p>
          <div className="text-xs">
            <p>Product state: {product.status}</p>
            <p className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
              {product.stock > 0 ? 'In stock' : 'Out of stock'}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>
              Item total: <span className="font-semibold">${product.price * product.quantity!}</span>
            </p>
            <p className="inline-block px-3 rounded-full bg-gray-400 hover:shadow-md">Quantity: {product.quantity}</p>
          </div>
        </div>
        <div className="grid gap-2">
          <Button onClick={() => dispatch(addToCart(product))}>
            <Plus size={25} className="h-6 w-6" />
          </Button>
          <Button onClick={() => dispatch(decreaseQuantity(product))}>
            <Minus size={25} className="h-6 w-6" />
          </Button>
          <Button variant={'destructive'} onClick={() => dispatch(removeFromCart(product))}>
            <Trash2 size={25} className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
