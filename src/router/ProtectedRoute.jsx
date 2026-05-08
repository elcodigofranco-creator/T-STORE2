import { Navigate, Outlet } from 'react-router-dom';
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

export function PublicRoute() {
  const { user } = useAuthStore();
  if (user) return <Navigate to="/hub" replace />;
  return <Outlet />;
}
