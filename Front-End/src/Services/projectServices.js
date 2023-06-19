import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from 'src/Environment';
import { setLoading } from 'src/Store/Reducers/AuthSlice';
import { setProjectList, setSelectedProject } from 'src/Store/Reducers/projectSlice';

export const getProjectList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${REACT_APP_APIURL}/projects`);
    const { err, data } = response.data;
    if (err === 0) {
      dispatch(setProjectList(data || []));
      return true;
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createProject = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setLoading(true));
      const response = await axios.post(`${REACT_APP_APIURL}/projects`, payload);
      const { err } = response.data;
      if (err === 0) {
        return true;
      }
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProject = (payload, projectId) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setLoading(true));
      const response = await axios.put(`${REACT_APP_APIURL}/projects/${projectId}`, payload);
      const { err } = response.data;
      if (err === 0) {
        toast.success('Project updated successfully');
        return true;
      }
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    if (projectId) {
      dispatch(setLoading(true));
      const response = await axios.delete(`${REACT_APP_APIURL}/projects/${projectId}`);
      const { err } = response.data;
      if (err === 0) {
        toast.success('Project deleted successfully');
        return true;
      }
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const getProject = (projectId) => async (dispatch) => {
  try {
    if (projectId) {
      dispatch(setLoading(true));
      const response = await axios.get(`${REACT_APP_APIURL}/projects/${projectId}`);
      const { err, data } = response.data;
      if (err === 0) {
        dispatch(setSelectedProject(data));
        return true;
      }
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

const toastError = () => {
  toast.error('Something went wrong, Please try again later');
};
