// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import WorkerPage from './pages/WorkerPage';
import Home from './pages/Home';
import ContractsControl from './pages/ContractsControl';
import ScheduleControl from './pages/ScheduleControl';
import DiaryControl from './pages/DiaryControl';
import CostControl from './pages/CostControl';
import AdmLogin from './pages/AdmLogin';
import AdmPage from './pages/AdmPage';
import WorkingSiteInclusion from './pages/WorkingSiteInclusion';
import WorkerInclusion from './pages/WorkerInclusion';
import Permissions from './pages/Permissions';
import WorkList from './pages/WorkList';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdmLogin />} />
        <Route path="/worker" element={<PrivateRoute><WorkerPage /></PrivateRoute>} />
        <Route path="/home/:workId" element={<PrivateRoute><Home /></PrivateRoute>} />
        
        {/* Rotas protegidas para os controles específicos da obra */}
        <Route path="/contracts-control/:workId" element={<PrivateRoute><ContractsControl /></PrivateRoute>} />
        <Route path="/schedule-control/:workId" element={<PrivateRoute><ScheduleControl /></PrivateRoute>} />
        <Route path="/diary-control/:workId" element={<PrivateRoute><DiaryControl /></PrivateRoute>} />
        <Route path="/cost-control/:workId" element={<PrivateRoute><CostControl /></PrivateRoute>} />
        
        {/* Rotas protegidas para o administrador */}
        <Route path="/admin-page" element={<PrivateRoute adminOnly={true}><AdmPage /></PrivateRoute>} />
        <Route path="/working-site-inclusion" element={<PrivateRoute adminOnly={true}><WorkingSiteInclusion /></PrivateRoute>} />
        <Route path="/worker-inclusion" element={<PrivateRoute adminOnly={true}><WorkerInclusion /></PrivateRoute>} />
        <Route path="/permissions" element={<PrivateRoute adminOnly={true}><Permissions /></PrivateRoute>} />
        <Route path="/work-list" element={<PrivateRoute adminOnly={true}><WorkList /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
