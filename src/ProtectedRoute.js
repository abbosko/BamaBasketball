import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from 'AuthContext.js';

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to='/admin/signin' />;
  }
  return children;
};

export default ProtectedRoute;