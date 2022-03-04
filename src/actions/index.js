// Coloque aqui suas actions
export const EMAIL_LOGIN = 'EMAIL_LOGIN';

const emailLogin = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export default emailLogin;
