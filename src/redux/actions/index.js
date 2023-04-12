// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAIL = 'FETCH_API_FAIL';

export const insertUser = (user) => ({
  type: ADD_USER,
  payload: {
    user,
  },
});

export const insertcurrencies = (data) => ({
  type: FETCH_API_SUCCESS,
  payload: {
    data,
  },
});

export const currenciesError = (error) => ({
  type: FETCH_API_FAIL,
  payload: {
    error,
  },
});

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(insertcurrencies(Object.keys(data)));
  } catch (error) {
    dispatch(currenciesError(error.message));
  }
};
