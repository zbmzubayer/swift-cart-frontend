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

const isLoggedIn = () => {
  const authToken = getFromLocalStorage(tokenKey);
  return !!authToken;
};

export { getUserByToken, isLoggedIn };