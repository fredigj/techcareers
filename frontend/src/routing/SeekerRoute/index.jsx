import React from 'react'
import { Navigate } from 'react-router-dom';

const SeekerRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
    if (!user.isAdmin) {
      return <Navigate to="/landing" replace />;
    }
  
    return children;
  };

export default SeekerRoute