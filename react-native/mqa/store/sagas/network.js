import {put, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import {Creators as NetworkActions} from "../ducks/network";

export function* startWatchingNetworkConnectivity() {
  const channel = eventChannel(emitter => {
    const unsubscribe = NetInfo.addEventListener(emitter);
    return () => unsubscribe;
  });
  try {
    let lastConnectionState = null;
    while (true) {
      const {isConnected} = yield take(channel);
      if (lastConnectionState !== isConnected) {
        yield put(isConnected ? NetworkActions.online() : NetworkActions.offline());
      }
      lastConnectionState = isConnected;
    }
  } finally {
    channel.close();
  }
}
