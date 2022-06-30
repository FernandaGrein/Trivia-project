import { COUNT_SCORE, GET_EMAIL, GET_NAME, INICIAL_SCORE } from '../actions';

const FIXED_VALUE = 10;


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
  case INICIAL_SCORE:
    return {
      ...state,
      score: 0,
    };
  case COUNT_SCORE:
    return {
      ...state,
      score: state.score + FIXED_VALUE + (action
        .payload.timer * action.payload.num),
    };

  default:
    return state;
  }
};

export default playerReducer;
