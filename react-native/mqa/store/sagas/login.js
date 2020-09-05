import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import * as RootNavigation from '../../services/navigation';
import {
  Creators as LoginActions,
  Types as LoginTypes,
} from '../ducks/login';
import api from '../../services/api';
import { colors } from '../../styles';

function* login({ payload }) {
  try {
    /*
    PRA FAZER UMA CHAMADA A METODOS, VC PODE CHAMAR FUNCOES NORMAIS TB, COMO SALVAR TOKEN ETC
    yield call (metodo, argumentos)
    ex: yield call (api.get, url, data)
    */
    const { status, data } = yield call(
      api.get,
      'https://jsonplaceholder.typicode.com/users',
    );
    if (status === 200) {
      if (
        data?.find(
          (e) =>
            e.username === payload.username &&
            e.username === payload.password,
        )
      ) {
        /*
          VC USA O PUT PRA CHAMAR AS ACTIONS, VC PODE PASSAR O DATA POR PARAMETRO
        */
        yield put(
          LoginActions.loginSuccess({ data: 1, success: true }),
        );
        showMessage({
          message: 'Sucesso',
          description: 'Logado com sucesso!',
          type: 'success',
          backgroundColor: colors.success,
          floating: true,
          position: 'top',
        });
        RootNavigation.navigate('Home');
      } else {
        yield put(LoginActions.loginFail());
        showMessage({
          message: 'Erro',
          description: 'Credenciais inválidas!',
          type: 'error',
          backgroundColor: colors.tomato,
          floating: true,
          position: 'top',
        });
      }
    }
  } catch (e) {
    yield put(LoginActions.loginFail());
    showMessage({
      message: 'Erro',
      description: 'Erro ao acessar api',
      type: 'error',
      backgroundColor: colors.tomato,
      floating: true,
      position: 'top',
    });
  }
}

function* loginWatcher() {
  yield takeLatest(LoginTypes.LOGIN_REQUEST, login);
}

export default function* rootSaga() {
  yield all([fork(loginWatcher)]);
}
