import { FETCH_API_FAIL, FETCH_API_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const dataWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API_SUCCESS: {
    return {
      ...state,
      currencies: action.payload.data.filter((coin) => coin !== 'USDT'),
    };
  }
  case FETCH_API_FAIL: {
    return {
      ...state,
      currencies: action.payload.error,
    };
  }
  default:
    return state;
  }
};

export default dataWallet;
