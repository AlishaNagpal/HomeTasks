import { useDispatch } from 'react-redux';
import * as  SocialLogin from './SocialLoginHandler';
import { updateToken } from '../Modules/SignUP/Action'

export default function LogOut() {
    const dispatch = useDispatch();
    return(
        SocialLogin.logOut(),
        dispatch(updateToken(''))
    )
};
