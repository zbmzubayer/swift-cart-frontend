import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import demoSlice from './features/product/demoSlice';
import productReducer from './features/product/productSlice';
import userFilterReducer from './features/user/userFilterSlice';

export const store = configureStore({
  reducer: {
    demo: demoSlice,
    auth: authReducer,
    userFilter: userFilterReducer,
    cart: cartReducer,
    product: productReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
