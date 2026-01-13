import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

/**
 * Custom hook for authentication management
 * Provides user state, login, logout, and auth utilities
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error parsing stored user:', error);
                    clearAuth();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    // Clear all auth data
    const clearAuth = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    // Login function
    const login = useCallback(async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            const { token, user: userData } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', userData.role);
            localStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);
            setIsAuthenticated(true);

            return { success: true, user: userData };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed',
            };
        }
    }, []);

    // Logout function
    const logout = useCallback(() => {
        clearAuth();
        navigate('/login');
    }, [clearAuth, navigate]);

    // Check if user has specific role
    const hasRole = useCallback((roles) => {
        if (!user) return false;
        const roleArray = Array.isArray(roles) ? roles : [roles];
        return roleArray.includes(user.role);
    }, [user]);

    // Get redirect path based on role
    const getRedirectPath = useCallback(() => {
        if (!user) return '/login';

        const dashboardRoutes = {
            admin: '/admin/dashboard',
            doctor: '/doctor/dashboard',
            patient: '/patient/dashboard',
        };

        return dashboardRoutes[user.role] || '/patient/dashboard';
    }, [user]);

    return {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        hasRole,
        getRedirectPath,
        clearAuth,
    };
};

export default useAuth;
