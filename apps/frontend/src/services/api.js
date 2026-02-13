import axios from 'axios';

// Create an axios instance with default config
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Add the reader's token to the Authorization header
    const readerToken = process.env.REACT_APP_READER_TOKEN; // Load from environment variable
    if (readerToken) {
      config.headers.Authorization = `Bearer ${readerToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);