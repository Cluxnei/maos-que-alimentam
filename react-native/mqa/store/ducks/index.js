import { combineReducers } from 'redux';
import login from './login';
import network from './network';

const rootReducer = combineReducers({
  network,
  login,
});

export default rootReducer;
