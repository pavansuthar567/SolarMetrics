import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from './theme/DefaultColors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setupToken } from './routes/AuthTokenHelper';

const Token = setupToken();
console.log('Token', Token);

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      const { status } = error?.response?.data || {};
      console.log('error?.response', error?.response);
      console.log('status', status);
      // if (status === 401) {
      //   localStorage.removeItem('UserPreferences');
      //   window.location.href = '/auth/login';
      // }
      return Promise.reject(error);
    },
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
        <ToastContainer theme="colored" />
      </ThemeProvider>
    </>
  );
}

export default App;
