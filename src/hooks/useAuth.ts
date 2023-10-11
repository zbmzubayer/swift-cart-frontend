import { setLoading, setUser } from '@/redux/features/auth/authSlice';
import { useGetUserByIdQuery } from '@/redux/features/user/userApi';
import { useAppDispatch } from '@/redux/hook';
import { getUserByToken } from '@/services/auth.service';
import { useEffect } from 'react';

export default function useAuth() {
  const dispatch = useAppDispatch();
  let userId = null;
  const tokenPayload = getUserByToken();
  if (tokenPayload) userId = tokenPayload.id;
  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, { skip: !userId });

  useEffect(() => {
    if (userId!) dispatch(setLoading(true));
  }, [userId, dispatch]);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUser(data?.data));
      dispatch(setLoading(false));
    } else if (isError) {
      dispatch(setLoading(false));
    }
  }, [data, isLoading, dispatch, isError]);

  return { isLoading };
}
