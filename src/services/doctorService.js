import api from './api';

const getDoctors = async () => {
  const res = await api.get('/doctors');
  return res.data;
};

const getDoctorById = async (id) => {
  const res = await api.get(`/doctors/${id}`);
  return res.data;
};

export default {
  getDoctors,
  getDoctorById,
};
