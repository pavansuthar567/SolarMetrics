import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reportList: [],
  selectedReport: {},
};

export const report = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReportList: (state, action) => {
      state.reportList = action.payload;
    },
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
  },
});

export const { setReportList, setSelectedReport } = report.actions;
