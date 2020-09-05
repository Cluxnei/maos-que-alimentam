/* eslint-disable no-console */
import Reactotron, { overlay } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import Constants from 'expo-constants';

const { manifest } = Constants;
export const getLocalIP = () => {
  return manifest.debuggerHost.split(':')[0];
};

export const reactotronConfigure = () => {
  if (__DEV__) {
    const tron = Reactotron.configure({ host: getLocalIP() })
      .useReactNative()
      .use(overlay())
      .use(reactotronRedux())
      .use(sagaPlugin())
      .connect();

    console.tron = tron;

    tron.clear();
  } else {
    console.tron = class {
      static log(...rest) {
        console.log(...rest);
      }
    };
  }
};
