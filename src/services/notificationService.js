import api from './api';

const sendWhatsApp = async ({ to, doctorName, appointmentTime }) => {
  return await api.post('/notifications/send', {
    to,
    doctorName,
    appointmentTime,
  });
};

export default { sendWhatsApp };
