// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ContractsControl from './pages/ContractsControl';
import ScheduleControl from './pages/ScheduleControl';
import DiaryControl from './pages/DiaryControl';
import CostControl from './pages/CostControl';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rotas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/contracts-control"
          element={
            <PrivateRoute>
              <ContractsControl />
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule-control"
          element={
            <PrivateRoute>
              <ScheduleControl />
            </PrivateRoute>
          }
        />
        <Route
          path="/diary-control"
          element={
            <PrivateRoute>
              <DiaryControl />
            </PrivateRoute>
          }
        />
        <Route
          path="/cost-control"
          element={
            <PrivateRoute>
              <CostControl />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
