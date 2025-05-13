import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';

const renderRoutes = () => [
  <Route key="/" path="/" element={<Login />} />,
  <Route key="/register" path="/register" element={<Register />} />,
  <Route 
    key="/dashboard" 
    path="/dashboard" 
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    } 
  />
];

export default renderRoutes;
