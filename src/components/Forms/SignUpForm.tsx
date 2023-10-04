import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateCustomerMutation } from '@/redux/features/customer/customerApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import { ButtonLoading } from '../Buttons/ButtonLoading';
import { Checkbox } from '../ui/checkbox';
import { toast } from '../ui/use-toast';

const formSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).email(),
    name: z.string({ required_error: 'Name is required' }),
    phone: z
      .string({ required_error: 'Phone is required' })
      .min(11, { message: 'Phone number must be 11 characters long' })
      .max(11, { message: 'Phone number must be 11 characters long' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(50, { message: 'Password must be at most 50 characters long' }),
    confirmPassword: z
      .string({ required_error: 'Confirm Password is required' })
      .min(8, { message: 'Confirm Password must be at least 8 characters long' })
      .max(50, { message: 'Confirm Password must be at most 50 characters long' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [createCustomer, { isLoading, isSuccess }] = useCreateCustomerMutation();

  const onSubmit = async (values: FormValues) => {
    const payload = {
      email: values.email,
      password: values.password,
      customer: { name: values.name, phone: values.phone },
    };
    try {
      const res = await createCustomer(payload).unwrap();
      toast({
        title: `Welcome to Swift Cart! ${res?.data?.customer?.name}`,
        description: 'Please login to continue shopping',
        variant: 'success',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: 'Failed to create account!!!',
        description: `${err?.data?.errorMessages[0].message}`,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate('/login');
    }
  }, [isLoading, isSuccess, navigate]);

  return (
    <div className="w-[480px] grid gap-4 border-2 border-amber-700 rounded-xl px-10 pt-5 pb-10">
      <h1 className="text-3xl font-bold text-center text-amber-900">Create an account</h1>
      <p className="text-center text-gray-500">Enter the information below to create your account</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-[4.5rem]">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-[4.5rem]">
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="h-[4.5rem]">
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-[4.5rem]">
                <FormControl>
                  <div className="flex relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      {...field}
                      className="pr-8"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-2.5 px-1.5 rounded-full text-slate-500 hover:bg-slate-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="h-[4.5rem]">
                <FormControl>
                  <div className="flex relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      {...field}
                      className="pr-8"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-2.5 px-1.5 rounded-full text-slate-500 hover:bg-slate-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">You agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
          <div className="mt-5">
            {!isLoading ? (
              <Button variant={'brand'} type="submit" className="w-full">
                Sign Up
              </Button>
            ) : (
              <ButtonLoading title="Processing" className="w-full" />
            )}
          </div>
        </form>
      </Form>
      <div className="text-center font-medium hover:text-amber-700">
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}
