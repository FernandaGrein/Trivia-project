import { GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  questions: '',
  token: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    localStorage.setItem('token', action.payload);
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
