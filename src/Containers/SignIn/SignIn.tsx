import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './styles';
import { Images, Strings, Colors } from '../../Constants';
import { CustomButton, Toast, CustomTextInput } from '../../Components';
import * as  SocialLogin from '../../Components/SocialLoginHandler'
import { useDispatch } from 'react-redux';
import { updateToken, getResult, userLoggedInFrom } from '../../Modules/SignUP/Action';
import FirebaseService from '../../Components/Firebase';

export interface SignINProps {
    navigation: any
}
const image = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
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
                // setEmail(''),
                // setPassword(''),
                onPressLogin(),
                setisAnimating(true)
            )
        } else {
            return (
                setCallWork(true),
                setisAnimating(false),
                setEmail(''),
                setPassword('')
            )
        }
    }

    const data = (token: any, result: any) => {
        dispatch(
            getResult(result.email, result.name, result.picture.data.url, () => {
                setisAnimating(false);
                dispatch(updateToken(token));
                dispatch(userLoggedInFrom('Facebook'));
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
                    dispatch(userLoggedInFrom('LinkedIN'));
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

    const onPressLogin = () => {
        const user = {
            name: 'Alisha',
            email,
            password: Password,
            avatar: image
        };

        if (email !== '' && Password !== '') {
            FirebaseService.login(
                user,
                loginSuccess,
                loginFailed
            );
        } else {
            Alert.alert('Fill all the details please!')
        }


    };

    const loginSuccess = (data: any) => {
        dispatch(
            getResult(
                email,
                Strings.appName,
                image,

                () => {
                    setisAnimating(false);
                    dispatch(updateToken(Math.random().toString()));
                    dispatch(userLoggedInFrom('Firebase'));
                },
            ),
        );
        props.navigation.navigate('Home', {
            name: data.user.displayName,
            email: data.user.email,
            avatar: image,
            userId: data.user._user.uid,
        });
    };

    const loginFailed = () => {
        Alert.alert(
            'Not Registered?',
            'SignUp',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => props.navigation.navigate('SignUP') },
            ],
            { cancelable: false }
        ),
            setEmail(''),
            setPassword(''),
            setisAnimating(false)

    };

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
                        _handleFocus={() => setonFocus(true)}
                        _handleBlur={() => setonFocus(false)}
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
                        onSubmitEditing={() => { passwordValidation(Password), setonPasswordFocus(false), signIn() }}
                        ref={passwordRef}
                        _handleFocus={() => setonPasswordFocus(true)}
                        _handleBlur={() => setonPasswordFocus(false)}
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
                <Toast top={-40} from={30} to={-40} message={Strings.invalidCreds} call={(value: boolean) => resetCallWork(value)} />
            }
        </View>
    );
};
