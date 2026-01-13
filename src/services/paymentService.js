import api from './api';

/**
 * Payment Service
 * Handles all payment-related API calls
 */

/**
 * Process card payment
 * @param {Object} paymentData - Payment details
 * @param {string} paymentData.paymentMethodId - Stripe payment method ID
 * @param {string} paymentData.appointmentId - Appointment ID
 * @param {string} paymentData.doctorId - Doctor ID
 */
export const processPayment = async (paymentData) => {
    const response = await api.post('/payments/process', paymentData);
    return response.data;
};

/**
 * Create Stripe checkout session
 * @param {Object} checkoutData - Checkout session details
 * @param {string} checkoutData.appointmentId - Appointment ID
 * @param {string} checkoutData.doctorId - Doctor ID
 * @param {number} checkoutData.amount - Amount in INR
 */
export const createCheckoutSession = async (checkoutData) => {
    const response = await api.post('/payments/create-checkout-session', checkoutData);
    return response.data;
};

/**
 * Get payment history for current user
 */
export const getPaymentHistory = async () => {
    const response = await api.get('/payments/history');
    return response.data;
};

export default {
    processPayment,
    createCheckoutSession,
    getPaymentHistory,
};
