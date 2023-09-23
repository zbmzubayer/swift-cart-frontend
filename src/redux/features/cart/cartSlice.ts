import { IProduct } from '@/interfaces/product.interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(product => product.id === action.payload.id);
      if (isExist) {
        isExist.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    decreaseQuantity: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(product => product.id === action.payload.id);
      if (isExist && isExist.quantity! > 1) {
        isExist.quantity! -= 1;
        state.total -= action.payload.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(product => product.id !== action.payload.id);
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
