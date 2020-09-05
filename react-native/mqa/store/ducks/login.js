export const Types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
};

const INITIAL_STATE = {
  loading: false,
  data: null,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.LOGIN_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case Types.LOGIN_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export const Creators = {
  login: (payload) => ({
    type: Types.LOGIN_REQUEST,
    payload,
  }),
  loginSuccess: (payload) => ({
    type: Types.LOGIN_SUCCESS,
    payload,
  }),
  loginFail: () => ({
    type: Types.LOGIN_FAIL,
  }),
};
