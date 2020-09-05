import {SET_NET_INFO_STATE} from '../actions/types';

const initialState = {
  netInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NET_INFO_STATE:
      const {netInfo} = action;
      return {
        ...state,
        netInfo,
      };
    default:
      return state;
  }
};
