import { configureStore } from '@reduxjs/toolkit';
import { auth } from './Reducers/AuthSlice';
import { project } from './Reducers/projectSlice';
import { product } from './Reducers/productSlice';
import { report } from './Reducers/reportSlice';

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
    project: project.reducer,
    product: product.reducer,
    report: report.reducer,
  },
});
