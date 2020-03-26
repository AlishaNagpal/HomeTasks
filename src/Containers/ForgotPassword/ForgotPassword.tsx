import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Images, Strings, Colors } from '../../Constants';
import { CustomTextInput, Toast, CustomButton } from '../../Components';

export interface SignINProps {
    navigation?: any,
}

export default function SignINComponent(props: SignINProps) {

    const [Email, setEmail] = useState('');
    const [onEmailFocus, setonEmailFocus] = useState(false);
    const [call, setCall] = useState(false);

    const resetCall = (value: boolean) => {
        setCall(value);
    };

    const goBack = () => {
        props.navigation.goBack();
    }

    const _updateMasterState = (attrName: any, value: any) => {
        return attrName(value);
    }

    const emailValidation = (email: string) => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) || email === '') {
            resetCall(true)
        } else {
            setEmail(email)
            submit()
        }
    }

    const submit = () => {
        if (Email !== '') {
            props.navigation.navigate('VerificationCode')
        } else {
            Alert.alert('Please enter your Email!')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity style={styles.backArrowButton} onPress={goBack} >
                    <Image source={Images.forgotPasswordBackArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerText} >{Strings.forgotPassword}</Text>
            </View>
            <Image source={Images.forgotPasswordImage} style={styles.key} />
            <Text style={styles.text} > {Strings.forgotPasswordText} </Text>
            <CustomTextInput
                value={Email}
                style={[styles.passwordField, { borderColor: onEmailFocus ? Colors.socialColor : Colors.white }]}
                attrName={setEmail}
                updateMasterState={_updateMasterState}
                keyboardType={'email-address'}
                returnKeyType={'done'}
                placeholderStyle={Strings.loginEmailField}
                secureTextEntry={false}
                onSubmitEditing={() => { emailValidation(Email), setonEmailFocus(false) }}
                _handleFocus={() => setonEmailFocus(true)}
                _handleBlur={() => setonEmailFocus(false)}
            />
            <CustomButton styleButton={styles.buttonStyle} pressMethod={submit} text={Strings.submit} Social={false} />
            {call &&
                <Toast top={-40} from={30} to={-40} message={Strings.validEmail} call={(value: boolean) => resetCall(value)} />
            }
        </View>
    );
};
