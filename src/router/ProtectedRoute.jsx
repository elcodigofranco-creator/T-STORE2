import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export function ProtectedRoute() {
  const { user, session } = useAuthStore();
  if (!user || !session) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function AdminRoute() {
  const { isAdmin } = useAuthStore();
  if (!isAdmin) return <Navigate to="/hub" replace />;
  return <Outlet />;
}
