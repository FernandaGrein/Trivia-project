import { GET_EMAIL, GET_NAME, INICIAL_SCORE } from '../actions';
// COUNT_SCORE,

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

// const FIXED_VALUE = 10;
// const HARD_QUESTIONS = 3;
// const MEDIUM_QUESTIONS = 2;
// const EASY_QUESTIONS = 1;

const playerReducer = (state = INITIAL_STATE, action) => {
  // const num = 1;
  switch (action.type) {
  case GET_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case GET_EMAIL:
    console.log(state.score);
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case INICIAL_SCORE:
    return {
      ...state,
      score: 0,
    };
  // case COUNT_SCORE:
  //   console.log('hard', action.payload.dificuldade);
  //   console.log('timer', action.payload.timer);
  //   if (action.payload.dificuldade === 'hard') {
  //     num = HARD_QUESTIONS;
  //     console.log('if hard', num);
  //     return num;
  //   }
  //   if (action.payload.dificuldade === 'medium') {
  //     num = MEDIUM_QUESTIONS;
  //     console.log('medium if');
  //     return num;
  //   }
  //   if (action.payload.dificuldade === 'easy') {
  //     console.log('easy if');
  //     num = EASY_QUESTIONS;
  //     return num;
  //   }
  //   return {
  //     ...state,
  //     score: state.score + FIXED_VALUE + (action.payload.timer * num),
  //   };
  default:
    return state;
  }
};

export default playerReducer;

// if (action.payload.dificuldade === hard) {
//   return {
//     ...state,
//     score: state.score + FIXED_VALUE + (action.payload.timer * HARD_QUESTIONS),
//   };
// } if (action.payload.dificuldade === medium) {
//   return {
//     ...state,
//     score: state.score + FIXED_VALUE + (action.payload.timer * MEDIUM_QUESTIONS),
//   };
// } if (action.payload.dificuldade === easy) {
//   return {
//     ...state,
//     score: state.score + FIXED_VALUE + (action.payload.timer * EASY_QUESTIONS),
//   };
// }
