import { configureStore } from '@reduxjs/toolkit';
import { auth } from './Reducers/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
    // projects: filtersReducer,
  },
});
