import {combineReducers} from 'redux';
import HomeReducer from '../Modules/Home/HomeReducer';
import SignUpReducer from '../Modules/SignUP/Reducer';
import SplashReducer from '../Modules/Splash/Reducer';
import ProfileReducer from '../Modules/Profile/ProfileReducer';

export const reducer = combineReducers({
  HomeReducer,
  SignUpReducer,
  SplashReducer,
  ProfileReducer,
});
