// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Artwork API calls
export const artworkService = {
  getAllArtworks: () => api.get('/artworks'),
  getArtwork: (id) => api.get(`/artworks/${id}`),
  createArtwork: (data) => api.post('/artworks', data),
  updateArtwork: (id, data) => api.put(`/artworks/${id}`, data),
  deleteArtwork: (id) => api.delete(`/artworks/${id}`),
};

// Staff API calls
export const staffService = {
  getAllStaff: () => api.get('/staff'),
  getStaffMember: (id) => api.get(`/staff/${id}`),
  createStaffMember: (data) => api.post('/staff', data),
  updateStaffMember: (id, data) => api.put(`/staff/${id}`, data),
  deleteStaffMember: (id) => api.delete(`/staff/${id}`),
};

// Shifts API calls
export const shiftService = {
  getAllShifts: () => api.get('/shifts'),
  getShift: (id) => api.get(`/shifts/${id}`),
  createShift: (data) => api.post('/shifts', data),
  updateShift: (id, data) => api.put(`/shifts/${id}`, data),
  deleteShift: (id) => api.delete(`/shifts/${id}`),
};

// Categories API calls
export const categoryService = {
  getAllCategories: () => api.get('/categories'),
}