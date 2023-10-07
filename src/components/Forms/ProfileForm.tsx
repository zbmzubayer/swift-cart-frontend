import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useUpdateCustomerMutation } from '@/redux/features/customer/customerApi';
import { useAppSelector } from '@/redux/hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ButtonLoading } from '../Buttons/ButtonLoading';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  gender: z.string().optional(),
  dob: z.coerce.date().optional(),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfileForm() {
  const { user } = useAppSelector(state => state.auth);
  const defaultValues: Partial<FormValues> = {
    name: user?.customer?.name,
    phone: user?.customer?.phone,
    gender: user?.customer?.gender || undefined,
    dob: user?.customer?.dob || undefined,
    address: user?.customer?.address || undefined,
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const res = await updateCustomer({ id: user?.customer?.id, ...data });
    console.log(res);
  };
  return (
    <div className="grid gap-4 border border-amber-700 rounded-lg px-10 pt-5 pb-10">
      <h1 className="text-3xl font-bold text-amber-900">Profile</h1>
      <p className="">Your profile information</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 lg:max-w-md">
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Email" {...field} readOnly />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Phone</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-[250px]">
                <div className="flex justify-between items-center">
                  <FormLabel>Gender</FormLabel>
                  <FormMessage />
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`${!field.value && 'text-muted-foreground'}`}>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[250px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick your birth date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
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
          {!isLoading ? (
            <Button variant={'brand'} type="submit">
              Update Profile
            </Button>
          ) : (
            <ButtonLoading title="Saving changes" />
          )}
        </form>
      </Form>
    </div>
  );
}
