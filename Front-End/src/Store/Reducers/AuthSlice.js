import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: {},
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUserProfile } = auth.actions;
