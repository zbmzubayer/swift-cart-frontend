import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IProductFilter {
  inStock: boolean;
  priceRange: number;
}

const initialState: IProductFilter = {
  inStock: false,
  priceRange: 20000,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleInStock: state => {
      state.inStock = !state.inStock;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleInStock, setPriceRange } = productSlice.actions;

export default productSlice.reducer;
