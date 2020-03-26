import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Images, Strings, Colors } from '../../Constants';
import { CustomTextInput, Toast, CustomButton } from '../../Components';

export interface SignINProps {
    navigation?: any,
}

export default function SignINComponent(props: SignINProps) {

    const passwordRef = React.createRef();
    const passwordConfirmRef = React.createRef();

    const [Password, setPassword] = useState('');
    const [onPasswordFocus, setonPasswordFocus] = useState(false);
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [onConfirmPasswordFocus, setonConfirmPasswordFocus] = useState(false);
    const [call, setCall] = useState(false);
    const [callNoMatch, setcallNoMatch] = useState(false);

    const submit = () => {
        props.navigation.pop(3)
    }
    const resetCall = (value: boolean) => {
        setCall(value);
    };
    const resetcallNoMatch = (value: boolean) => {
        setcallNoMatch(value);
    };
    const goBack = () => {
        props.navigation.goBack();
    }
    const _updateMasterState = (attrName: any, value: any) => {
        return attrName(value);
    }

    const passwordValidation = (password: string) => {
        if (!(/^(?=.{6,})(?=.*[@#$%^&+=]).*$/.test(password)) || Password === '') {
            resetCall(true)
        } else {
            setPassword(password)
        }
    }

    const passwordMAtchValidation = (password: string, confirmPassword: string) => {
        if (Password === '' || ConfirmPassword === '') {
            resetCall(true)
        } else {
            if (!(/^(?=.{6,})(?=.*[@#$%^&+=]).*$/.test(password)) || !(/^(?=.{6,})(?=.*[@#$%^&+=]).*$/.test(confirmPassword)) || Password !== ConfirmPassword) {
                resetcallNoMatch(true)
            } else {
                setPassword(password)
                submit()
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity style={styles.backArrowButton} onPress={goBack} >
                    <Image source={Images.forgotPasswordBackArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerText} >{Strings.resetPassword}</Text>
            </View>
            <Image source={Images.resetPasswordKey} style={styles.key} />
            <Text style={styles.text} > {Strings.resetPasswordText} </Text>
            <CustomTextInput
                value={Password}
                ref={passwordRef}
                style={[styles.passwordField, { borderColor: onPasswordFocus ? Colors.socialColor : Colors.white }]}
                attrName={setPassword}
                updateMasterState={_updateMasterState}
                keyboardType={'default'}
                returnKeyType={'next'}
                placeholderStyle={Strings.NewPassword}
                secureTextEntry={true}
                onSubmitEditing={() => { passwordValidation(Password), setonPasswordFocus(false), passwordConfirmRef.current.focus() }}
                _handleFocus={() => setonPasswordFocus(true)}
                _handleBlur={() => setonPasswordFocus(false)}
            />
            <CustomTextInput
                value={ConfirmPassword}
                ref={passwordConfirmRef}
                style={[styles.confirmPasswordField, { borderColor: onConfirmPasswordFocus ? Colors.socialColor : Colors.white }]}
                attrName={setConfirmPassword}
                updateMasterState={_updateMasterState}
                keyboardType={'default'}
                returnKeyType={'done'}
                placeholderStyle={Strings.confirmPassword}
                secureTextEntry={true}
                onSubmitEditing={() => { passwordValidation(ConfirmPassword), setonConfirmPasswordFocus(false), passwordMAtchValidation(Password, ConfirmPassword) }}
                _handleFocus={() => setonConfirmPasswordFocus(true)}
                _handleBlur={() => setonConfirmPasswordFocus(false)}
            />
            <CustomButton styleButton={styles.buttonStyle} pressMethod={submit} text={Strings.submit} Social={false} />
            {call &&
                <Toast top={-40} from={30} to={-40} message={Strings.inValidPassword} call={(value: boolean) => resetCall(value)} />
            }
            {callNoMatch &&
                <Toast top={-40} from={30} to={-40} message={Strings.passwordNoMatch} call={(value: boolean) => resetcallNoMatch(value)} />
            }
        </View>
    );
};
