import api from './api';

const sendWhatsApp = async ({ to, doctorName, appointmentTime }) => {
  return await api.post('/notifications/send', {
    to,
    doctorName,
    appointmentTime,
  });
};

// Optionally, add email notification if needed
// const sendEmail = async ({ to, doctorName, appointmentTime }) => {
//   return await api.post('/notifications/email', { to, doctorName, appointmentTime });
// };

export default { sendWhatsApp };
