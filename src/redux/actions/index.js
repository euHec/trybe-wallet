// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';

const insertUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export default insertUser;
