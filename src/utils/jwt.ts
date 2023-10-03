import jwtDecode, { CustomJwtPayload } from 'jwt-decode';
export const decodedToken = (token: string) => {
  return jwtDecode<CustomJwtPayload>(token);
};
