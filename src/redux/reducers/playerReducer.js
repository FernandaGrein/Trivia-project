import { GET_EMAIL, GET_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case GET_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
