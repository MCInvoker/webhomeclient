import React, { lazy } from 'react';

const Login = lazy(() => import('../page/LoginRegister'));
const Home = lazy(() => import('../page/SimpleHome'));

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];

export default routes;
