import { configureStore } from '@reduxjs/toolkit';
import { auth } from './Reducers/AuthSlice';
import { project } from './Reducers/projectSlice';

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
    project: project.reducer,
  },
});
