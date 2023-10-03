import { IProduct } from '@/interfaces/product.interface';
import { useGetProductByIdQuery } from '@/redux/features/product/productApi';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id!);
  const product: IProduct = data?.data;
  console.log(product?.subCategory);

  if (isLoading) return <div className="text-center">Loading...</div>;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-10 bg-gray-400">
        <div className="flex justify-center items-center p-1 bg-white rounded-md border">
          <img src={product?.image} alt={product?.name} className="h-[350px] aspect-square object-contain" />
        </div>
        <div className="col-span-2">
          <h1 className="text-2xl font-medium">{product?.name}</h1>
          <Link to={`/store/${product?.seller?.id}`} className="text-cyan-600 hover:underline hover:underline-offset-2">
            Visit the {product?.seller?.companyName} Store
          </Link>
          <div>
            <p>Status: {product?.status}</p>
            <p>
              <span>Availability: </span>
              <span className={`${product?.stock > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {product?.stock > 0 ? 'In stock' : 'Out of stock'}
              </span>
            </p>
            <p>Sold count: {product?.soldCount}</p>
            <p>Rating: 4</p>
            <p className="text-xl font-bold tracking-wider">${product?.price}</p>
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
