export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const COUNT_SCORE = 'COUNT_SCORE';
export const INICIAL_SCORE = 'INICIAL_SCORE';

const HARD_QUESTIONS = 3;
const MEDIUM_QUESTIONS = 2;
const EASY_QUESTIONS = 1;

export const ADD_QUESTIONS = (param) => ({
  type: FETCH_QUESTIONS,
  questions: param,
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

export const scoreCounter = (timer, dificuldade) => (dispatch) => {
  let num = 1;

  if (dificuldade === 'hard') {
    num = HARD_QUESTIONS;
    console.log('if hard', num);
  }
  if (dificuldade === 'medium') {
    num = MEDIUM_QUESTIONS;
    console.log('medium if');
  }
  if (dificuldade === 'easy') {
    console.log('easy if');
    num = EASY_QUESTIONS;
  }
  console.log(num);
  return dispatch(count(timer, num));
};

export const inicialScore = () => ({
  type: INICIAL_SCORE,
});

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
