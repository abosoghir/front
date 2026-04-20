import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute — wraps pages that require authentication.
 *
 * @param {React.ReactNode} children - Page component to render
 * @param {string[]} [roles] - Optional required roles (e.g. ['Seeker'], ['Helper'])
 */
export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, loading, roles: userRoles } = useAuth();
  const location = useLocation();

  // Still initializing auth state — show a spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8fb]">
        <div className="flex flex-col items-center gap-3">
          <i className="ri-loader-4-line animate-spin text-3xl text-[#e94560]"></i>
          <span className="text-sm text-gray-500 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  // Not authenticated — redirect to login, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check — if specific roles are required, verify user has at least one
  if (roles && roles.length > 0) {
    const hasRequiredRole = roles.some((role) => userRoles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
