import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { LoginButton, AccessToken, ShareDialog, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import styles from './styles';
import * as  SocialLogin from '../../Components/SocialLoginHandler'

interface AppProps {
    navigation?: any
};

export default function SignUP(props: AppProps) {
    const [profile, setProfile] = useState([]);

    const data = (token:any,result:any) =>{
        console.log(token,result);
    }
    const errorCallback = (error: any) => {
        console.log(error);
        
    }
    const login = async () => {
        SocialLogin.fbLogin(data,errorCallback)
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={login} >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
};
