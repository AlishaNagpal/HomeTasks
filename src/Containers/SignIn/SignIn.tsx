import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './styles';
import { Images, Strings, Colors } from '../../Constants';
import { CustomButton, Toast, CustomTextInput } from '../../Components';
import * as  SocialLogin from '../../Components/SocialLoginHandler'
import { useDispatch } from 'react-redux';
import { updateToken, getResult } from '../../Modules/SignUP/Action';

export interface SignINProps {
    navigation: any
}

export default function SignINComponent(props: SignINProps) {
    const dispatch = useDispatch()

    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const [isAnimating, setisAnimating] = useState(false);
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [call, setCall] = useState(false);
    const [callWork, setCallWork] = useState(false);
    const [onFocus, setonFocus] = useState(false);
    const [onPasswordFocus, setonPasswordFocus] = useState(false);


    const resetCall = (value: boolean) => {
        setCall(value);
    };
    const resetCallWork = (value: boolean) => {
        setCallWork(value);
    };

    const emailValidation = (email: string) => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) || email === '') {
            resetCall(true)
        } else {
            setEmail(email)
        }
    }

    const passwordValidation = (password: string) => {
        if (!(/^(?=.{6,})(?=.*[@#$%^&+=]).*$/.test(password)) || password === '') {
            resetCall(true)
        } else {
            setPassword(password)
        }
    }

    const signIn = () => {
        if (Password !== '' || email !== '') {
            return (
                setCallWork(true)
            )
        } else {
            return (
                Alert.alert('Please enter details!')
            )
        }
    }

    const data = (token: any, result: any) => {
        dispatch(
            getResult(result.email, result.name, result.picture.data.url, () => {
                setisAnimating(false);
                dispatch(updateToken(token));
            }),
        );
    }
    const errorCallback = (error: any) => {
        console.log(error);
        setisAnimating(false);
    }

    const login = () => {
        SocialLogin.fbLogin(data, errorCallback)
        setisAnimating(true)
    }

    const liData = (token: string, email: string, result: any) => {
        dispatch(
            getResult(
                email,
                result.localizedFirstName + ' ' + result.localizedLastName,
                result.profilePicture['displayImage~'].elements[3].identifiers[0]
                    .identifier,
                () => {
                    setisAnimating(false);
                    dispatch(updateToken(token));
                },
            ),
        );
    };

    const _updateMasterState = (attrName: any, value: any) => {
        return attrName(value);
    }

    const goToForgotPassword = () => {
        props.navigation.navigate('ForgotPassword')
    }

    return (
        <View style={styles.container}>
            <Image
                source={Images.loginImage}
                style={styles.image}
            />
            <View style={styles.mainView} >
                <Text style={styles.moreSocial} >{Strings.appName}</Text>
                <Text style={styles.tagLine}>{Strings.appTagLine}</Text>
                <View style={styles.textinputAll} >
                    <CustomTextInput
                        value={email}
                        style={[styles.emailField, { borderColor: onFocus ? Colors.socialColor : Colors.white }]}
                        attrName={setEmail}
                        updateMasterState={_updateMasterState}
                        keyboardType={'email-address'}
                        returnKeyType={'next'}
                        placeholderStyle={Strings.loginEmailField}
                        secureTextEntry={false}
                        onSubmitEditing={() => { emailValidation(email), setonFocus(false), passwordRef.current.focus() }}
                        ref={emailRef}
                        _handleFocus={setonFocus}
                    />

                    <CustomTextInput
                        value={Password}
                        style={[styles.passwordField, { borderColor: onPasswordFocus ? Colors.socialColor : Colors.white }]}
                        attrName={setPassword}
                        updateMasterState={_updateMasterState}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        placeholderStyle={Strings.Password}
                        secureTextEntry={true}
                        onSubmitEditing={() => { passwordValidation(Password), setonPasswordFocus(false) }}
                        ref={passwordRef}
                        _handleFocus={setonPasswordFocus}
                    />

                    <CustomButton styleButton={styles.buttonStyle} pressMethod={signIn} text={Strings.signIn} Social={false} />
                    <ActivityIndicator
                        animating={isAnimating}
                        size="large"
                        color={Colors.socialColor}
                        style={styles.indicator}
                    />
                    <TouchableOpacity onPress={goToForgotPassword} >
                        <Text style={styles.forgotPassword} > {Strings.forgotPassword}? </Text>
                    </TouchableOpacity>
                    <Text style={styles.orSign} > {Strings.orSignIn} </Text>
                    <View style={styles.socialButtons} >
                        <TouchableOpacity style={styles.facebook} onPress={login} >
                            <Image source={Images.fb} style={styles.fbIcon} />
                        </TouchableOpacity>
                        {SocialLogin.linkedInLogin(liData, 2)}
                    </View>
                    <View style={styles.noAccountView} >
                        <Text style={styles.noAccount} > {Strings.noAccount} </Text>
                        <Text style={styles.SignUp} > {Strings.signUp} </Text>
                    </View>
                </View>
            </View>
            {call &&
                <Toast top={-40} from={30} to={-40} message={Strings.Invalid} call={(value: boolean) => resetCall(value)} />
            }
            {callWork &&
                <Toast top={-40} from={30} to={-40} message={Strings.underWork} call={(value: boolean) => resetCallWork(value)} />
            }
        </View>
    );
};
