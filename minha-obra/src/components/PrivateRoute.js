// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
