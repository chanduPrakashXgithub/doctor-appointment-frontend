import api from './api';
export default {
  login: (credentials) => api.post('/auth/login', credentials).then(res => res.data),
  register: (userInfo) => api.post('/auth/register', userInfo).then(res => res.data),
};
