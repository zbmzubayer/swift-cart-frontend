import 'jwt-decode';

declare module 'jwt-decode' {
  export interface CustomJwtPayload extends JwtPayload {
    id: string;
    userId: string;
    role: string;
  }
}

export { CustomJwtPayload };
