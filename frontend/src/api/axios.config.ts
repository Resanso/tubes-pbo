import axios from 'axios';

/**
 * Pre-configured Axios instance for all Spring Boot API calls.
 * The Vite dev proxy forwards /api/* to http://localhost:8080 automatically.
 * In production, set VITE_API_BASE_URL in your .env file.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

// Attach JWT token to every outbound request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler — redirects to /login on 401 (skip for login/register endpoints)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.includes('/users/login') ||
                           error.config?.url?.includes('/users/register');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
