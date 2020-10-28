import {all, call, put, fork, takeLatest, select} from 'redux-saga/effects';
import {getToken, storeToken} from '../asyncStorage';
import * as RootNavigation from '../../services/navigation';
import {Creators as LoginActions, Types as LoginTypes} from '../ducks/auth';
import api from '../../services/api';
import routes from "../../services/routes";
import {dangerMessage, offlineMessage, successMessage} from "../../services/messages";

function* login({payload}) {
  try {
    const {online} = yield select((state) => state.network);
    if (!online) {
      yield put(LoginActions.loginFail());
      return offlineMessage();
    }
    const {status, data} = yield call(api.post, routes.login, payload);
    if (status !== 200) {
      yield put(LoginActions.loginFail());
      return dangerMessage('Ops', 'Credenciais inválidas!');
    }
    const {user, token} = data;
    if (token) {
      yield call(storeToken, token.accessToken);
    }
    yield put(LoginActions.loginSuccess({user}));
    successMessage('Sucesso', 'Logado com sucesso!');
    RootNavigation.navigate('Home');
  } catch (e) {
    yield put(LoginActions.loginFail());
    dangerMessage('Erro', 'Erro ao acessar o servidor');
  }
}

function* persistLogin({payload}) {
  if (payload !== null) {
    const token = yield call(getToken);
    if (token) {
      RootNavigation.navigate('Home');
    }
  }
}

function* logout() {
  yield storeToken(null);
  RootNavigation.navigate('Login');
}

function* persistLoginWatcher() {
  yield takeLatest(LoginTypes.PERSIST_LOGIN, persistLogin);
}

function* loginWatcher() {
  yield takeLatest(LoginTypes.LOGIN_REQUEST, login);
}

function* logoutWatcher() {
  yield takeLatest(LoginTypes.USER_LOGOUT, logout);
}

export default function* rootSaga() {
  yield all([fork(loginWatcher), fork(persistLoginWatcher), fork(logoutWatcher)]);
}
