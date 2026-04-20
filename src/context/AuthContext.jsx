import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../api/authService';
import profileService from '../api/profileService';
import { clearAuth } from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;
  const roles = user?.roles || [];
  const isSeeker = roles.includes('Seeker');
  const isHelper = roles.includes('Helper');

  // ── Bootstrap: check for stored session on mount ────────────────
  useEffect(() => {
    const init = async () => {
      const storedUser = localStorage.getItem('wasla_user');
      const storedToken = localStorage.getItem('wasla_token');

      if (storedUser && storedToken) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);

          // Validate token by fetching profile
          const profileData = await profileService.getMyProfile();
          setProfile(profileData);
        } catch {
          // Token invalid or expired — interceptor will handle refresh
          // If refresh also fails, clearAuth is called by the interceptor
          clearAuth();
          setUser(null);
          setProfile(null);
        }
      }
      setLoading(false);
    };

    init();
  }, []);

  // ── Login ───────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);

    // Store auth data
    localStorage.setItem('wasla_token', data.token);
    localStorage.setItem('wasla_refresh_token', data.refreshToken);
    localStorage.setItem('wasla_refresh_token_expiration', data.refreshTokenExpiration);
    localStorage.setItem('wasla_user', JSON.stringify(data));

    setUser(data);

    // Fetch full profile
    try {
      const profileData = await profileService.getMyProfile();
      setProfile(profileData);
    } catch {
      // Profile fetch is non-critical for login success
    }

    return data;
  }, []);

  // ── Register ────────────────────────────────────────────────────
  const register = useCallback(async (name, email, phoneNumber, password, role) => {
    const data = await authService.register(name, email, phoneNumber, password, role);
    return data;
  }, []);

  // ── Logout ──────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem('wasla_refresh_token');
    try {
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch {
      // Ignore errors on logout
    } finally {
      clearAuth();
      setUser(null);
      setProfile(null);
    }
  }, []);

  // ── Refresh profile data ────────────────────────────────────────
  const refreshProfile = useCallback(async () => {
    try {
      const profileData = await profileService.getMyProfile();
      setProfile(profileData);
      return profileData;
    } catch {
      return null;
    }
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAuthenticated,
    isSeeker,
    isHelper,
    roles,
    login,
    register,
    logout,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
