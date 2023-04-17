import {
  FETCH_API_FAIL,
  FETCH_API_SUCCESS,
  ADD_EXPENSES,
  ADD_TOTAL_EXPENSES,
  ADD_NEW_EXPENSES,
  REQUEST_EDIT_EXPENSES,
  NEW_EXPENSES_EDIT } from '../actions';

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
    return { ...state, currencies: result };
  }
  case FETCH_API_FAIL: {
    return { ...state, currencies: action.payload.error };
  }
  case ADD_TOTAL_EXPENSES: {
    if (state.expenses.length !== 0) {
      const values = state.expenses
        .map((expense) => expense.value * expense.exchangeRates[expense.currency].ask);
      const soma = values.reduce((acumulador, valorAtual) => acumulador + valorAtual);
      return { ...state,
        totalExpenses: `${soma}` };
    }
    return { ...state, totalExpenses: '0' };
  }
  case ADD_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.payload.expenses,
        id: state.expenses.length === 0
          ? 0 : (state.expenses.length - 1) + 1,
        exchangeRates: { ...action.payload.data },
      }],
    };
  }
  case ADD_NEW_EXPENSES: {
    return { ...state, expenses: action.payload.expenses };
  }
  case REQUEST_EDIT_EXPENSES: {
    return { ...state, editor: !state.editor, idToEdit: action.payload.id };
  }
  case NEW_EXPENSES_EDIT: {
    return {
      ...state,
      editor: false,
      expenses: [{
        ...action.payload.expenses,
        id: action.payload.id,
        exchangeRates: action.payload.data,
      }, ...action.payload.newExpenses],
    };
  }
  default:
    return state;
  }
};

export default dataWallet;
