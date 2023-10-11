import envConfig from '@/config';
import { tokenKey } from '@/constants/storageKeys';
import { decodedToken } from '@/utils/jwt';
import { getFromLocalStorage } from '@/utils/local-storage';

const getUserByToken = () => {
  const authToken = getFromLocalStorage(tokenKey);
  if (authToken) {
    try {
      return decodedToken(authToken);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const getUserById = async (id: string, token: string) => {
  const res = await fetch(`${envConfig.API_BASE_URL}/user/${id}`, {
    headers: {
      Authorization: token!,
    },
  });
  const data = await res.json();
  return data;
};

export { getUserById, getUserByToken };
