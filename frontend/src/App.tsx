import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages publiques
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import ReservationPage from './pages/ReservationPage';
import RestaurantPage from './pages/RestaurantPage';
import RoomsPage from './pages/chambres/page';
import RoomDetailPage from './pages/chambres/[id]/page';
import ServicesPage from './pages/ServicesPage';
import NotFound from './pages/NotFound';

// Pages Admin
import LoginAdmin from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';

// Contexte
import { AppProvider } from './context/AppContext';

// Protection
function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <AppProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/chambres" element={<RoomsPage />} />
          <Route path="/chambres/:id" element={<RoomDetailPage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/reservation" element={<ReservationPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}
