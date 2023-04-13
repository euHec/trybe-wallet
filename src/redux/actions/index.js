import fetchApi from '../../helpers/FetchAPI';

export const ADD_USER = 'ADD_USER';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAIL = 'FETCH_API_FAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_TOTAL_EXPENSES = 'ADD_TOTAL_EXPENSES';
export const ADD_NEW_EXPENSES = 'ADD_NEW_EXPENSES';

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

export const insertAPI = () => async (dispatch) => {
  try {
    const result = await fetchApi();
    dispatch(insertcurrencies(result));
  } catch (error) {
    dispatch(currenciesError(error.message));
  }
};

export const insertExpenses = (expenses, data, id) => ({
  type: ADD_EXPENSES,
  payload: {
    expenses,
    data,
    id,
  },
});

export const insertTotalExpenses = (totalExpenses) => ({
  type: ADD_TOTAL_EXPENSES,
  payload: {
    totalExpenses,
  },
});

export const insertNewExpenses = (expenses) => ({
  type: ADD_NEW_EXPENSES,
  payload: {
    expenses,
  },
});
