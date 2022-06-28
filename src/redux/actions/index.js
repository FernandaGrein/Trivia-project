// export const ADD_PLAYER = 'ADD_PLAYER';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';

// export const RESPONSE_CODE = '';

// export const ADD_PLAYER = (param) => ({
//     type: ADD_EMAIL,
//     email: param,
//   })

export const ADD_QUESTIONS = (param) => ({
  type: FETCH_QUESTIONS,
  questions: param,
});
export const getToken = (token) => ({
  type: GET_TOKEN,
  payloand: token,
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
