import getCurrencyApi from '../services/CurrencyAPI';

// Coloque aqui suas actions
export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const SET_WALLET = 'SET_WALLET';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR';

const emailLogin = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export const setWallet = (wallet) => ({
  type: SET_WALLET,
  payload: wallet,
});

export function fetchCurrencySuccess(payload) {
  return {
    type: FETCH_CURRENCY_SUCCESS,
    payload,
  };
}

const fetchCurrencyError = (error) => ({
  type: FETCH_CURRENCY_ERROR,
  errorMessage: error,
});

export const fetchCurrencyThunk = () => async (dispatch) => {
  try {
    const fetchSuccess = await getCurrencyApi();
    dispatch(fetchCurrencySuccess(fetchSuccess));
  } catch (error) {
    dispatch(fetchCurrencyError(error.message));
  }
};

// export const exchangeRatesThunk = () => async (dispatch) => {
//   try {
//     const fetchSuccess = await getCurrencyApi();
//     dispatch(fetchRatesSuccess(fetchSuccess));
//   } catch (error) {
//     dispatch(fetchRatesError(error.message));
//   }
// };

export default emailLogin;
