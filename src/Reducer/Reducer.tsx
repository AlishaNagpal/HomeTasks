import {combineReducers} from 'redux';
import HomeReducer from '../Modules/Home/HomeReducer';
import SignUpReducer from '../Modules/SignUP/Reducer';
import SplashReducer from '../Modules/Splash/Reducer';

export const reducer = combineReducers({
  HomeReducer,
  SignUpReducer,
  SplashReducer,
});
