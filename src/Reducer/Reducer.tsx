import {combineReducers} from 'redux';
import HomeReducer from '../Modules/Home/HomeReducer';
import SignUpReducer from '../Modules/SignUP/Reducer';
import SplashReducer from '../Modules/Splash/Reducer';
import ProfileReducer from '../Modules/Profile/ProfileReducer';
import ChatReducer from '../Modules/Chat/ChatReducer';
import MediaMessagesReducer from '../Modules/MediaMessage/MediaMessageReducer';

export const reducer = combineReducers({
  HomeReducer,
  SignUpReducer,
  SplashReducer,
  ProfileReducer,
  ChatReducer,
  MediaMessagesReducer,
});
