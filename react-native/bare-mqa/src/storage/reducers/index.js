import {combineReducers} from 'redux';
// Reducers
import UserReducer from './UserReducer';
import NetInfoReducer from './NetInfoReducer';

export default combineReducers({
  UserReducer,
  NetInfoReducer,
});
