export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const COUNT_SCORE = 'COUNT_SCORE';
export const COUNTER_INDEX = 'COUNTER_INDEX';

const HARD_QUESTIONS = 3;
const MEDIUM_QUESTIONS = 2;
const EASY_QUESTIONS = 1;

export const GET_RESPOSTA = 'GET_RESPOSTA';

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

export const saveResposta = (resposta) => ({
  type: GET_RESPOSTA,
  payload: resposta,
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
    await dispatch(saveResposta(json));

    return dispatch(ADD_QUESTIONS(json));
  } catch (error) {
    console.log(error);
  }
};
