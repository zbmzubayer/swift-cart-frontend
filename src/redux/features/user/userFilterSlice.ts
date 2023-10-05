import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';

type UserFilterState = {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
};

const initialState: UserFilterState = {
  sorting: [],
  columnFilters: [],
};

const userFilterSlice = createSlice({
  name: 'userFilter',
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortingState>) => {
      state.sorting = action.payload;
    },
    setColumnFilters: (state, action: PayloadAction<ColumnFiltersState>) => {
      state.columnFilters = action.payload;
    },
  },
});

export const { setSorting, setColumnFilters } = userFilterSlice.actions;

export default userFilterSlice.reducer;
