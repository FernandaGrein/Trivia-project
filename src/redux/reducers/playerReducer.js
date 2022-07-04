import { GET_NAME, COUNT_SCORE, GET_EMAIL,
  COUNT_ASSERTIONS, RESET_GAME } from '../actions';

const FIXED_VALUE = 10;

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
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
  case COUNT_SCORE:
    return {
      ...state,
      score: state.score + FIXED_VALUE + (action
        .payload.timer * action.payload.num),
    };
  case RESET_GAME:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  case COUNT_ASSERTIONS:
    if (action.payload === 'certo') {
      return {
        ...state,
        assertions: state.assertions + 1,
      };
    }
    return { ...state };
  default:
    return state;
  }
};

export default player;
