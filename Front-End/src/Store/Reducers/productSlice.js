import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
  selectedProduct: {
    // title: '',
    // description: '',
    // is_active: true,
  },
};

export const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProductList, setSelectedProduct } = product.actions;
