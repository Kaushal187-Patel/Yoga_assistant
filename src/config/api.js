// API Configuration
// In production, use relative URL (same origin)
// In development, use localhost
const isDevelopment = process.env.NODE_ENV === 'development';
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api' 
  : '/api';

export default API_BASE_URL;
