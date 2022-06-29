import { GET_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: 'email - da - pessoa',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_NAME:
    console.log(action.payload);
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
