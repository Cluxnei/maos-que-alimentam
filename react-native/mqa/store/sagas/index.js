import {all, spawn} from 'redux-saga/effects';

import loginSagas from './login';
import {startWatchingNetworkConnectivity} from './network';

export default function* rootSaga() {
  return yield all([
    spawn(startWatchingNetworkConnectivity),
    loginSagas(),
  ]);
}
