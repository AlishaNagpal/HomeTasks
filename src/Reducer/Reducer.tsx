import {combineReducers} from 'redux';
import HomeReducer from '../Modules/Home/HomeReducer';
import SignUpReducer from '../Modules/SignUP/Reducer';

export const reducer = combineReducers({
  HomeReducer,
  SignUpReducer
});
