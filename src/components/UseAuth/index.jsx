import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import routes from '../../router';

function matchRoute(path) {
  const findPath = routes.find((val) => val.path === path);
  if (!findPath) {
    return;
  }
  return findPath;
}
export default function AuthRoute(props) {
  const location = useLocation();
  const isLogin = localStorage.getItem('token');
  const currentPath = location.pathname;

  const loginPath = currentPath === '/login';

  const findPath = matchRoute(currentPath);

  if (loginPath && !isLogin) {
    return props.children;
  }

  if ((!findPath || loginPath) && isLogin) {
    return <Navigate to="/home" />;
  }

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
