import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import WishlistPage from './pages/WishlistPage';
import DecisionPage from './pages/DecisionPage';
import HistoryPage from './pages/HistoryPage';
import AddItemPage from './pages/AddItemPage';
import Navbar from './components/common/Navbar';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
}

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicOnlyRoute><LandingPage /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />

        {/* Private routes — dashboard replaces landing after login */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />
        <Route path="/decision" element={<PrivateRoute><DecisionPage /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
        <Route path="/add-item" element={<PrivateRoute><AddItemPage /></PrivateRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
