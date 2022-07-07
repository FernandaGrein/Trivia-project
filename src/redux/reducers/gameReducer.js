import { GET_TOKEN, FETCH_QUESTIONS, GET_ANSWER } from '../actions';

const INITIAL_STATE = {
  questions: [],
  token: '',
  resposta: [],
  responseMessage: '',
  index: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_TOKEN:
    localStorage.setItem('token', payload);
    return { ...state,
      token: payload };
  case FETCH_QUESTIONS:
    return { ...state,
      questions: payload.results };
  case GET_ANSWER:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default gameReducer;
