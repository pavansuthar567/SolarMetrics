import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from 'src/Environment';
import { setLoading } from 'src/Store/Reducers/AuthSlice';
import { setProjectList } from 'src/Store/Reducers/projectSlice';

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
    console.log('error', error);
    toast.error('Something went wrong, Please try again later');
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
      const { err, data } = response.data;
      if (err === 0) {
        return true;
      }
    }
  } catch (error) {
    console.log('error', error);
    toast.error('Something went wrong, Please try again later');
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
      const { err, data } = response.data;
      if (err === 0) {
        return true;
      }
    }
  } catch (error) {
    console.log('error', error);
    toast.error('Something went wrong, Please try again later');
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (projectId) => async (dispatch) => {
  try {
    if (projectId) {
      dispatch(setLoading(true));
      const response = await axios.delete(`${REACT_APP_APIURL}/projects/${projectId}`);
      console.log('response', response);
      const { err, data } = response.data;
      if (err === 0) {
        toast.success('Project deleted successfully');
        return true;
      }
    }
  } catch (error) {
    console.log('error', error);
    toast.error('Something went wrong, Please try again later');
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};
