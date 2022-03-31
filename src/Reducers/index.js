import { combineReducers } from 'redux';
import mainReducers from './mainReducers';

const RootReducer = combineReducers({
  main: mainReducers,
});
export default RootReducer;