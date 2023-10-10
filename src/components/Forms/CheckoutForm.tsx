import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { IProduct } from '@/interfaces';
import { clearCart } from '@/redux/features/cart/cartSlice';
import { useCreateOrderMutation } from '@/redux/features/order/orderApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { ButtonLoading } from '../Buttons/ButtonLoading';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
  phone: z
    .string({ required_error: 'Phone is required' })
    .min(11, { message: 'Phone number must be 11 characters long' })
    .max(11, { message: 'Phone number must be 11 characters long' }),
  address: z.string({ required_error: 'Address is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {};

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { products } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (values: FormValues) => {
    const orderItems = products.map((product: IProduct) => ({
      productId: product?.id,
      quantity: product?.quantity,
    }));
    const payload = {
      phone: values.phone,
      address: values.address,
      customerId: user?.customer?.id,
      orderItems,
    };
    try {
      const res = await createOrder(payload).unwrap();
      toast({
        title: `Congrats! ${res?.data?.customer?.name}`,
        description: 'Your order has been placed successfully',
        variant: 'success',
      });
      dispatch(clearCart());
    } catch (err) {
      toast({
        title: 'Something went wrong!!!',
        description: 'Failed to place your order',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate('/products');
    }
  }, [isLoading, isSuccess, navigate]);

  return (
    <div className="rounded-xl">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-amber-900">Checkout form</h1>
        <p className="text-gray-500">Enter the information below to place your order</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="h-20 w-1/2">
                <div className="flex justify-between items-center">
                  <FormLabel>Phone</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Address</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Textarea placeholder="Address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment method</SelectLabel>
                <SelectItem value="Cash on delivery">Cash on delivery</SelectItem>
                <SelectItem value="Credit card">Credit card</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-5 float-right">
            {products.length > 0 ? (
              !isLoading ? (
                <Button type="submit" className="text-base w-[200px]">
                  Place Order
                </Button>
              ) : (
                <ButtonLoading title="Processing" className="text-base w-[200px]" />
              )
            ) : (
              <p className="text-red-500">Nothing to checkout</p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
