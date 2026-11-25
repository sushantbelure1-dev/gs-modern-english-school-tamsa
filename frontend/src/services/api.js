import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000
});

// Interceptor for Admin JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gs_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Public APIs
export const getClasses = () => api.get('/classes');
export const getStaff = () => api.get('/staff');
export const getEvents = (params = {}) => api.get('/events', { params });
export const getEventById = (id) => api.get(`/events/${id}`);
export const getGallery = (params = {}) => api.get('/gallery', { params });
export const submitAdmissionEnquiry = (data) => api.post('/enquiries', data);
export const checkHealth = () => api.get('/health');

// Admin APIs
export const adminLogin = (credentials) => api.post('/auth/login', credentials);
export const verifyAdmin = () => api.get('/auth/verify');
export const getEnquiries = () => api.get('/enquiries');
export const updateEnquiry = (id, data) => api.put(`/enquiries/${id}`, data);
export const deleteEnquiry = (id) => api.delete(`/enquiries/${id}`);

export const uploadMediaFiles = (formData) => {
  return api.post('/gallery/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteGalleryMedia = (id) => api.delete(`/gallery/${id}`);

export const createSchoolEvent = (formData) => {
  return api.post('/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateSchoolEvent = (id, formData) => {
  return api.put(`/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteSchoolEvent = (id) => api.delete(`/events/${id}`);

export default api;
