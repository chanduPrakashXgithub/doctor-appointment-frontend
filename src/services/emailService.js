import api from './api';

const sendEmail = async ({ to, subject, text }) => {
  return await api.post('/notifications/email', { to, subject, text });
};

export default { sendEmail };
