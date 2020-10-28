import { combineReducers } from 'redux';
import auth from './auth';
import network from './network';

const rootReducer = combineReducers({
  network,
  auth,
});

export default rootReducer;
