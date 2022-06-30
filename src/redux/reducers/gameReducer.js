import { GET_TOKEN, FETCH_QUESTIONS, GET_RESPOSTA } from '../actions';

const INITIAL_STATE = {
  questions: {},
  token: '',
  resposta: [],
  responseMessage: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    localStorage.setItem('token', action.payload);
    return {
      ...state,
      token: action.payload,
    };
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  case GET_RESPOSTA:
    return {
      ...state,
      resposta: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
