import {
  FETCH_API_FAIL,
  FETCH_API_SUCCESS,
  ADD_EXPENSES,
  ADD_TOTAL_EXPENSES,
  ADD_NEW_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  coins: null,
  editor: false,
  idToEdit: 0,
  totalExpenses: '',
};

const dataWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API_SUCCESS: {
    const result = Object.keys(action.payload.data);
    result.splice(1, 1);
    return {
      ...state,
      currencies: result,
    };
  }
  case FETCH_API_FAIL: {
    return {
      ...state,
      currencies: action.payload.error,
    };
  }
  case ADD_TOTAL_EXPENSES: {
    return {
      ...state,
      totalExpenses: action.payload.totalExpenses,
    };
  }
  case ADD_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.payload.expenses,
        id: state.expenses.length === 0 ? 1 : state.expenses[state.expenses.length - 1].id + 1,
        exchangeRates: {
          ...action.payload.data,
        },
      }],
    };
  }
  case ADD_NEW_EXPENSES: {
    return {
      ...state,
      expenses: action.payload.expenses,
    };
  }
  default:
    return state;
  }
};

export default dataWallet;
