import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import MapView from './pages/MapView';
import Residents from './pages/Residents';
import Notifications from './pages/Notifications';
import './App.css';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing / Root is Login Page */}
          <Route path="/" element={<Login />} />
          
          {/* Main Dashboard Layout wrapper under /dashboard */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="map" element={<MapView />} />
            <Route path="residents" element={<Residents />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          
          {/* Catch-all redirect to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
