// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  // password: '',
};

const dataUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER: {
    return {
      ...state,
      email: action.payload.user.email,
      // password: action.payload.password,
    };
  }
  default: return state;
  }
};

export default dataUser;
