export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const COUNT_SCORE = 'COUNT_SCORE';
export const INICIAL_SCORE = 'INICIAL_SCORE';

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

export const scoreCounter = (timer, dificuldade) => ({
  type: COUNT_SCORE,
  payload: { timer, dificuldade },
});

export const inicialScore = () => ({
  type: INICIAL_SCORE,
});

// export const fetchApi = () => async (dispatch) => {
//     dispatch(actionCreateRequestApi());
//     try {
//       const response = await fetch(URL);
//       const json = await response.json();
//       return dispatch(sucessActionCreate(json))
//     } catch (error) {
//       return dispatch(failedActionCreate());
//     }
//   }

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
