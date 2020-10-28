import {all, spawn} from 'redux-saga/effects';

import authSagas from './auth';
import {startWatchingNetworkConnectivity} from './network';

export default function* rootSaga() {
  return yield all([
    spawn(startWatchingNetworkConnectivity),
    authSagas(),
  ]);
}
