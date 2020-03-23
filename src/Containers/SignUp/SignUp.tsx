import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as  SocialLogin from '../../Components/SocialLoginHandler'
import { useDispatch } from 'react-redux';
import { updateToken, getResult } from '../../Modules/SignUP/Action';
import { Images } from '../../Constants';

interface AppProps {
    navigation?: any
};

export default function SignUP(props: AppProps) {
    const dispatch = useDispatch()
    const data = (token: any, result: any) => {
        console.log(token, result);
        dispatch(updateToken(token))
        dispatch(getResult(result))
    }
    const errorCallback = (error: any) => {
        console.log(error);

    }
    const login = async () => {
        SocialLogin.fbLogin(data, errorCallback)
    }

    return (
        <ImageBackground
            source={Images.mainScreen}
            style={styles.container}
            resizeMode={'contain'}
        >
            <TouchableOpacity onPress={login} >
                <Text style={styles.textStyle} >Login with FB</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};
