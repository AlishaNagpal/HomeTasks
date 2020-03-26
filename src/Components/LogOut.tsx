import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import * as  SocialLogin from './SocialLoginHandler';
import { updateToken } from '../Modules/SignUP/Action';
import {View} from 'react-native';

export default function LogOut() {
    const dispatch = useDispatch();
    useEffect(() => {
        SocialLogin.logOut(),
        dispatch(updateToken(''))
    });
    return(
       <View/> 
    )
};
