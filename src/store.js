import { configureStore } from '@reduxjs/toolkit';
import { crudSlice } from './Reduce/crudSlice';

export const store = configureStore({
  reducer: {
    lists: crudSlice.reducer,
  },
});
