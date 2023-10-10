import CheckoutForm from '@/components/Forms/CheckoutForm';
import { useAppSelector } from '@/redux/hook';

export default function Checkout() {
  const { products, total } = useAppSelector(state => state.cart);
  return (
    <div className="justify-center items-center gap-10 lg:flex lg:h-[calc(100vh-80px)]">
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">Delivery Information</h1>
        <div className="h-[60vh] border border-gray-300 rounded-md py-5 px-10 overflow-auto">
          <CheckoutForm />
        </div>
      </div>
      <div className="max-w-lg w-full">
        <h1 className="mb-2">Order Summery</h1>
        <div className="border border-gray-300 rounded-md h-[60vh] p-10 flex flex-col">
          <div className="flex-grow  mb-2 space-y-2 overflow-auto">
            {products.map(product => (
              <div key={product.id} className="flex justify-between items-center bg-gray-100 p-1 rounded-lg">
                <div className="flex items-center">
                  <img src={product.image} className="h-[82px] rounded-md mr-2" alt="" />
                  <div>
                    <h1 className="text-lg mb-2">{product.name}</h1>
                    <p>Price: {product.price}</p>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl mr-5">{product.quantity}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <p>Total</p>
              <p>{total}$</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Delivery</p>
              <p>5$</p>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <p>Grand total</p>
              <p>{total + 5}$</p>
            </div>
            {/* <Button className="w-full text-base">Place Order</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
