import { GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  questions: '',
  token: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    localStorage.setItem('token', action.payloand);
    return {
      ...state,
      token: action.payloand,
    };
  default:
    return state;
  }
};

export default gameReducer;
