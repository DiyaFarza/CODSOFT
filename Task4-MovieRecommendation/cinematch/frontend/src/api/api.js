import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Automatically add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getMovies = () => API.get('/movies');
export const rateMovie = (data) => API.post('/movies/rate', data);
export const getMyRatings = () => API.get('/movies/my-ratings');
export const getRecommendations = () => API.get('/recommendations');