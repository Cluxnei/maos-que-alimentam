import {SET_USER} from '../actions/types';

const initialState = {
  user: {
    name: '',
    phone: '',
    cnpj: '',
    zipcode: '',
    street: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
    token: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const {user} = action;
      return {
        ...state,
        user,
      };
    default:
      return state;
  }
};
