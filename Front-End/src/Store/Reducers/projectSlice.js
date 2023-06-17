import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectList: [],
  selectedProject: {
    name: '',
    description: '',
    is_active: true,
  },
};

export const project = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectList: (state, action) => {
      state.projectList = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { setProjectList, setSelectedProject } = project.actions;
