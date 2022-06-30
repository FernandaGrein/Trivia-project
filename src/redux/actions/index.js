export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_NAME = 'GET_NAME';
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

export const saveResposta = (resposta) => ({
  type: GET_RESPOSTA,
  payload: resposta,
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

const respostaApi = [];

export const quizApi = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    console.log(json)

          const responseObj = {
              test: `data-testid="correct-answer"`,
              resposta: json.results[0].correct_answer,
          }

          respostaApi.push(responseObj);

          const objErro1 = {
              test: `data-testid="wrong-answer-${0}"`,
              resposta: json.results[0].incorrect_answers[0],
          }

          respostaApi.push(objErro1);

          const objErro2 = {
              test: `data-testid="wrong-answer-${1}"`,
              resposta: json.results[0].incorrect_answers[1]
          }
      
          respostaApi.push(objErro2);
      
          const objErro3 = {
              test: `data-testid="wrong-answer-${2}"`,
              resposta: json.results[0].incorrect_answers[2]
          }

          respostaApi.push(objErro3);
       
    dispatch(saveResposta(respostaApi));
    return dispatch(ADD_QUESTIONS(json));
  } catch (error) {
    console.log(error);
  }
};
