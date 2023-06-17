import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const setupToken = () => {
  let token;
  const UserPreferences = localStorage.getItem('UserPreferences');
  if (UserPreferences) token = JSON.parse(UserPreferences);
  if (token) {
    const decoded = jwtDecode(token?.token);
    const currentTime = parseInt(Date.now() / 1000);
    if (decoded.exp > currentTime) {
      setAuthToken(token?.token);
      return token;
    } else clearToken();
  }
  return false;
};

export const saveToken = (access_Token) => {
  const settings = {
    token: access_Token,
  };
  setAuthToken(access_Token);
  localStorage.setItem('UserPreferences', JSON.stringify(settings));
};

// Header Methods
export const setAuthToken = (access_Token) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ` + access_Token;
  } catch (e) {
    console.log('Error while setup token', e);
  }
};

export const clearToken = () => {
  localStorage.clear();
  clearAuthToken();
};

const clearAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};
