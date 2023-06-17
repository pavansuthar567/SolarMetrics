import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoutes from './ProtectedRoutes';
import UserProfile from 'src/views/UserProfile';
import Project from 'src/views/project';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      {
        path: '/dashboard',
        exact: true,
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/projects',
        exact: true,
        element: (
          <ProtectedRoutes>
            <Project />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/profile',
        exact: true,
        element: (
          <ProtectedRoutes>
            <UserProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/sample-page',
        exact: true,
        element: (
          <ProtectedRoutes>
            <SamplePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/icons',
        exact: true,
        element: (
          <ProtectedRoutes>
            <Icons />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/ui/typography',
        exact: true,
        element: (
          <ProtectedRoutes>
            <TypographyPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/ui/shadow',
        exact: true,
        element: (
          <ProtectedRoutes>
            <Shadow />
          </ProtectedRoutes>
        ),
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
