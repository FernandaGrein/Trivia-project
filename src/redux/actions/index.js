export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const COUNT_SCORE = 'COUNT_SCORE';
export const COUNTER_INDEX = 'COUNTER_INDEX';
export const COUNT_ASSERTIONS = 'COUNT_ASSERTIONS';
export const RESET_GAME = 'RESET_GAME';

const HARD_QUESTIONS = 3;
const MEDIUM_QUESTIONS = 2;
const EASY_QUESTIONS = 1;

export const GET_ANSWER = 'GET_ANSWER';

export const ADD_QUESTIONS = (param) => ({
  type: FETCH_QUESTIONS,
  payload: param,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const saveName = (name) => ({
  type: GET_NAME,
  payload: name,
});

export const saveEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

export const count = (timer, num) => ({
  type: COUNT_SCORE,
  payload: { timer, num },
});

export const saveAnswer = (answer) => ({
  type: GET_ANSWER,
  payload: answer,
});

export const countAssertions = (status) => ({
  type: COUNT_ASSERTIONS,
  payload: status,
});

export const scoreCounter = (timer, dificuldade) => (dispatch) => {
  let num = 1;

  if (dificuldade === 'hard') {
    num = HARD_QUESTIONS;
  }
  if (dificuldade === 'medium') {
    num = MEDIUM_QUESTIONS;
  }
  if (dificuldade === 'easy') {
    num = EASY_QUESTIONS;
  }
  return dispatch(count(timer, num));
};

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    const { token } = json;
    return dispatch(getToken(token));
  } catch (error) {
    console.log(error);
  }
};

export const quizApi = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    await dispatch(saveAnswer(json));

    return dispatch(ADD_QUESTIONS(json));
  } catch (error) {
    console.log(error);
  }
};

export const resetGame = () => ({
  type: RESET_GAME,
});
