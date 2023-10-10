import { IProduct } from '@/interfaces/product.interface';
import { addToCart, decreaseQuantity, removeFromCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface IProps {
  product: IProduct;
}

export default function CartCard({ product }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="max-w-2xl p-2 bg-slate-300 border border-amber-700 rounded-lg hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-1 bg-white border rounded-md hover:scale-125">
          <img src={product.image} alt={`${product.name} photo`} className="w-[110px] h-[110px] object-contain" />
        </div>
        <Link to={`/product/${product.id}`}>
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
        </Link>
        <div className="grid gap-2">
          <Button size="icon" onClick={() => dispatch(addToCart(product))}>
            <Plus className="h-6 w-6" />
          </Button>
          <Button size="icon" onClick={() => dispatch(decreaseQuantity(product))}>
            <Minus className="h-6 w-6" />
          </Button>
          <Button size="icon" variant={'destructive'} onClick={() => dispatch(removeFromCart(product))}>
            <Trash2 className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
