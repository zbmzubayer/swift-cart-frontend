import { cartKey } from '@/constants/storageKeys';
import { IProduct } from '@/interfaces/product.interface';
import { setCartToLocalStorage } from '@/services/cartService';
import { removeFromLocalStorage } from '@/utils/local-storage';
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
      setCartToLocalStorage(state.products);
    },
    decreaseQuantity: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(product => product.id === action.payload.id);
      if (isExist && isExist.quantity! > 1) {
        isExist.quantity! -= 1;
        state.total -= action.payload.price;
      }
      setCartToLocalStorage(state.products);
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(product => product.id !== action.payload.id);
      state.total -= action.payload.price * action.payload.quantity!;
      setCartToLocalStorage(state.products);
    },
    getCart: (state, action: PayloadAction<IProduct[] | []>) => {
      state.products = action.payload;
      state.products.map(product => {
        state.total += product.price * product.quantity!;
      });
    },
    clearCart: state => {
      state.products = [];
      state.total = 0;
      removeFromLocalStorage(cartKey);
    },
  },
});

export const { getCart, addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
