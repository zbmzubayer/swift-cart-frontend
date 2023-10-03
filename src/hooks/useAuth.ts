import { setUser } from '@/redux/features/auth/authSlice';
import { useGetUserByIdQuery } from '@/redux/features/user/userApi';
import { useAppDispatch } from '@/redux/hook';
import { getUserByToken } from '@/services/auth.service';
import { useEffect } from 'react';

export default function useAuth() {
  let userId = null;
  const tokenPayload = getUserByToken();
  if (tokenPayload) userId = tokenPayload.id;
  const { data, isLoading, isSuccess, error } = useGetUserByIdQuery(userId!, { skip: !userId });
  console.log(data, isLoading, isSuccess, error);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoading && data) {
      console.log(data?.data);
      console.log('hi');
      dispatch(setUser(data?.data));
    }
  }, [data, isLoading, dispatch]);
  return { data, isLoading, isSuccess, error };
}
