import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserInfo } from '../../customHooks/user';

const ProtectedRoute = ({ children }) => {
  const user = useUserInfo();
    if (!user) {
      return <Navigate to="/landing" replace />;
    }
  
    return children;
  };

export default ProtectedRoute