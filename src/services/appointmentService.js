import api from './api';

const book = async (data) => {
  const res = await api.post('/appointments/book', data);
  return res.data;
};

const getMine = async () => {
  const res = await api.get('/appointments/appointments');
  return res.data;
};

const cancel = async (id) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
};

export default {
  book,
  getMine,
  cancel,
};