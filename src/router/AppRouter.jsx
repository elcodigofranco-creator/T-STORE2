import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './ProtectedRoute';

// Auth
import LoginPage from '../features/auth/LoginPage';

// Main App Layout
import AppLayout from '../components/layout/AppLayout';

// Pages
import HubPage from '../features/hub/HubPage';
import StorePage from '../features/store/StorePage';
import LibraryPage from '../features/library/LibraryPage';
import InventoryPage from '../features/inventory/InventoryPage';
import MissionsPage from '../features/missions/MissionsPage';
import ProfilePage from '../features/profile/ProfilePage';

// Admin
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../features/admin/AdminDashboard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login is public, no registration */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect root to login if not auth, hub if auth */}
        <Route
          path="/"
          element={
            <ProtectedRoute />
          }
        >
          <Route index element={<Navigate to="/hub" replace />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/hub" element={<HubPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Catch all — redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
