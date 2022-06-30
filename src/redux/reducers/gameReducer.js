import { GET_TOKEN, FETCH_QUESTIONS, GET_RESPOSTA } from '../actions';

const INITIAL_STATE = {
  questions: {},
  token: '',
  resposta: [],
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
    console.log(action.payload)
    return {
      ...state,
      questions: action.payload,
    }
  case GET_RESPOSTA:
    console.log(action.payload)
    return {
      ...state,
      resposta: action.payload,
    }
  default:
    return state;
  }
};

export default gameReducer;
