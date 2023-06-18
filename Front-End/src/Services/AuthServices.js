import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from 'src/Environment';
import { setLoading, setUserProfile } from 'src/Store/Reducers/AuthSlice';
import { clearToken, saveToken } from 'src/routes/AuthTokenHelper';

export const setLoginToken = (access_Token) => {
  saveToken(access_Token);
  // const decoded = jwtDecode(access_Token);
};

export const login = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setLoading(true));
      const response = await axios.post(`${REACT_APP_APIURL}/login`, payload);
      const { data, err } = response.data;
      if (err === 0) {
        setLoginToken(data?.Token);
        return data;
      }
    } else return false;
  } catch (error) {
    console.log('error', error);
    toast.error('Something went wrong, Please try again later');
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const signup = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setLoading(true));
      const response = await axios.post(`${REACT_APP_APIURL}/signup`, payload);
      const { data, err } = response.data;
      if (err === 0) {
        setLoginToken(data?.Token);
        return data;
      }
    } else return false;
  } catch (error) {
    console.log('error', error);
    toast.error('Something went wrong, Please try again later');
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${REACT_APP_APIURL}/logout`);
    const { err } = response.data;
    if (err === 0) {
      clearToken();
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

export const getProfile = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${REACT_APP_APIURL}/profile`);
    const { err, data } = response.data;
    if (err === 0) {
      dispatch(setUserProfile(data));
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

export const updateProfile = (payload) => async (dispatch) => {
  try {
    console.log('payload', payload);
    if (payload) {
      dispatch(setLoading(true));
      const response = await axios.put(`${REACT_APP_APIURL}/profile`, payload);
      const { err, data } = response.data;
      console.log('data', data);
      if (err === 0) {
        dispatch(setUserProfile(data));
        toast.success('Profile updated succesfully!');
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
