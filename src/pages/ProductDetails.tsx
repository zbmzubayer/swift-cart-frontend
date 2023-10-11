import LoadingScreen from '@/components/LoadingScreen';
import { Button, buttonVariants } from '@/components/ui/button';
import { IProduct } from '@/interfaces/product.interface';
import { cn } from '@/lib/utils';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useGetProductByIdQuery } from '@/redux/features/product/productApi';
import { useAppDispatch } from '@/redux/hook';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id!);
  const product: IProduct = data?.data;

  const dispatch = useAppDispatch();

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="space-y-8 mt-10">
      <div className="flex justify-center gap-5">
        <div className="flex-shrink-0 p-2 rounded-md border">
          <img src={product?.image} alt={product?.name} className="h-[350px] w-[350px] object-contain" />
        </div>
        <div className="">
          <div>
            <h1 className="text-2xl font-medium">{product?.name}</h1>
            <Link
              to={`/store/${product?.seller?.id}`}
              className="text-cyan-600 hover:underline hover:underline-offset-2"
            >
              Visit the {product?.seller?.companyName} Store
            </Link>
            <div className="mt-3">
              <p>Status: {product?.status}</p>
              <p>
                <span>Availability: </span>
                <span className={`${product?.stock > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {product?.stock > 0 ? 'In stock' : 'Out of stock'}
                </span>
              </p>
              <p>Sold count: {product?.soldCount}</p>
              <p>Warranty: {product?.warranty}</p>
              <p>Rating: 4</p>
              <p className="mt-3 text-xl font-bold tracking-wider">${product?.price}</p>
            </div>
          </div>
          <div className="mt-10 space-x-5">
            <Button className="text-lg group w-[200px]" onClick={() => dispatch(addToCart(product))}>
              Add to cart
            </Button>
            <Link
              to="/customer/checkout"
              className={cn(buttonVariants(), 'text-lg w-[200px] bg-cyan-500 hover:bg-cyan-600')}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium">Description</h2>
        <p className="text-gray-500">{product?.description}</p>
      </div>
      <div>
        <h2 className="text-2xl font-medium">Reviews</h2>
        {product?.reviews?.map(review => (
          <div key={review.id}>
            <p className="text-lg font-medium">Comment: {review?.comment}</p>
            <p>Rating: {review?.rating}</p>
          </div>
        ))}
        {product?.reviews?.length === 0 && (
          <div>
            <p>No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
