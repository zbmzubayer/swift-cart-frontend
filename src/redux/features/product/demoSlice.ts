import { IProduct } from '@/interfaces/product.interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = demoSlice.actions;

export default demoSlice.reducer;
