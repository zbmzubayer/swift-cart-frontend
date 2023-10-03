import { IProduct } from '@/interfaces/product.interface';
import { cn } from '@/lib/utils';
import { addToCart, decreaseQuantity, removeFromCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { products, total } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-slate-100 border rounded-lg transition-all duration-200 hover:drop-shadow-lg hover:scale-[1.02] lg:w-[240px]">
      <Link to={`/product/${product.id}`}>
        <div className="m-1 p-1 bg-white rounded-md">
          <img src={product?.image} alt={product?.name} className="h-[150px] w-full object-contain" />
        </div>
        <h2 className="m-2 text-container font-medium lg:text-lg" title={product?.name}>
          {product?.name}
        </h2>
      </Link>
      <div className="m-3">
        <div className="space-y-2">
          <div className="text-sm text-gray-700 tracking-wide">
            <p className="">Status: {product?.status}</p>
            <p>
              <span>Availability: </span>
              <span className={`${product?.stock > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {product?.stock > 0 ? 'In stock' : 'Out of stock'}
              </span>
            </p>
            <p>Rating: 4</p>
          </div>
          <p className="font-bold tracking-wider">${product?.price}</p>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <button className={cn(buttonVariants(), 'mt-5 w-full group')} onClick={() => handleAddToCart(product)}>
                Add to cart
                <ShoppingCart
                  className="inline-block text-amber-950 ml-2 transition-all delay-300 duration-300 group-hover:animate-bounce"
                  size={16}
                />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>Total: ${total}</SheetDescription>
              </SheetHeader>
              <div className="mt-3 grid gap-2">
                {products.map(product => (
                  <div key={product.id} className="flex items-center justify-between gap-2 p-2 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <img
                        src={product.image}
                        alt={`${product.name} photo`}
                        className="w-[50px] aspect-square border rounded-sm object-contain"
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
                        <p className="inline-block px-3 rounded-full bg-gray-400 hover:shadow-md">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <button
                        className="p-2 bg-gray-400 hover:bg-gray-500 rounded-full"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        <Plus size={25} className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 bg-gray-400 hover:bg-gray-500 rounded-full"
                        onClick={() => dispatch(decreaseQuantity(product))}
                      >
                        <Minus size={20} className="h-6 w-6" />
                      </button>
                      <button
                        className="p-2 bg-gray-400 hover:bg-gray-500 rounded-full"
                        onClick={() => dispatch(removeFromCart(product))}
                      >
                        <Trash2 size={20} className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
