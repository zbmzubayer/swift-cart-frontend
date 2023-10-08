import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { tokenKey } from '@/constants/storageKeys';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { setLoading, setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getUserByToken } from '@/services/auth.service';
import { setToLocalStorage } from '@/utils/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password must be at most 50 characters long' }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading: isLoading1 }] = useLoginMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (values: FormValues) => {
    try {
      const res = await loginUser(values).unwrap();
      const token = res?.data?.accessToken;
      setToLocalStorage(tokenKey, token);
      toast({
        title: 'Login Success',
        description: 'You have logged in successfully',
        variant: 'success',
      });
      const userId = getUserByToken()?.id;
      const res2 = await fetch(`http://localhost:5000/api/v1/user/${userId}`, {
        headers: {
          Authorization: token!,
        },
      });
      const data = await res2.json();
      dispatch(setUser(data?.data));
      dispatch(setLoading(false));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: 'Login Failed',
        description: `${err?.message}`,
        variant: 'destructive',
      });
    }
  };

  const { user } = useAppSelector(state => state.auth);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="w-[400px] grid gap-4 border-2 border-amber-700 rounded-xl px-10 pt-5 pb-10">
      <h1 className="text-3xl font-bold text-center text-amber-900">Login</h1>
      <p className="text-center">Login to your account</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-20">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-20">
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
                      className="absolute right-1 top-2.5 rounded-full px-1.5 text-slate-500 hover:bg-slate-200"
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
          <Button variant={'brand'} type="submit" className="w-full">
            Login
            {isLoading1 && (
              <svg
                className="ml-2 animate-spin fill-white"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
            )}
          </Button>
        </form>
      </Form>
      <div className="text-center font-medium hover:text-amber-700">
        <Link to="/login">Forgot password?</Link>
      </div>
    </div>
  );
}
