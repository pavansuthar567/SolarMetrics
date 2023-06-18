import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from 'src/Environment';
import { setLoading } from 'src/Store/Reducers/AuthSlice';
import { setProductList } from 'src/Store/Reducers/productSlice';

const toastError = () => {
  toast.error('Something went wrong, Please try again later');
};

export const getProductList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${REACT_APP_APIURL}/products`);
    const { err, data } = response.data;
    if (err === 0) {
      dispatch(setProductList(data || []));
      return true;
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProduct = (payload, project_id) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setLoading(true));
      const response = await axios.put(`${REACT_APP_APIURL}/projects/${project_id}/products`);
      const { err, data } = response.data;
      if (err === 0) {
        toast.success('Product updated successfully!');
        return true;
      }
    } else {
      toast.error('Please fill up valid details.');
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createProduct = (payload, project_id) => async (dispatch) => {
  try {
    if (payload && project_id) {
      console.log('project_id', project_id);
      dispatch(setLoading(true));
      const response = await axios.post(`${REACT_APP_APIURL}/projects/${project_id}/products`);
      const { err, data } = response.data;
      if (err === 0) {
        toast.success('Product created successfully!');
        return true;
      }
    } else {
      toast.error('Please fill up valid details.');
    }
  } catch (error) {
    toastError();
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};
