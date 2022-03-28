import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return <Navigate to="/landing" replace />;
    }
  
    return children;
  };

export default ProtectedRoute