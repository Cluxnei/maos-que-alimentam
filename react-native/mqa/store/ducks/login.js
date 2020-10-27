export const Types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  PERSIST_LOGIN: 'PERSIST_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  user: null,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {...state, loading: true, success: false};
    case Types.LOGIN_SUCCESS:
      return {...state, ...action.payload, loading: false, success: true};
    case Types.LOGIN_FAIL:
      return {...state, loading: false, success: false};
    case Types.USER_LOGOUT:
      return INITIAL_STATE;
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
  persistLogin: (payload) => ({
    type: Types.PERSIST_LOGIN,
    payload,
  }),
  logout: () => ({
    type: Types.USER_LOGOUT,
  }),
};
