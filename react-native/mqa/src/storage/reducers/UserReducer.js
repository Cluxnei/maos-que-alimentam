import {SET_USER} from '../actions/types';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const {user} = action;
      return {
        ...state,
        user: {
          id: user.id,
          name: user.name,
        },
      };
    default:
      return state;
  }
};
