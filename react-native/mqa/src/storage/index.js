import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import reducer from './reducers';

const middleware = [];

if (__DEV__) {
  middleware.push(createLogger());
}
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const storage = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
);
export const persistor = persistStore(storage);
