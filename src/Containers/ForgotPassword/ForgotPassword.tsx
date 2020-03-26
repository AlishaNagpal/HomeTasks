import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Images, Strings, Colors } from '../../Constants';
import { CustomTextInput, Toast, CustomButton } from '../../Components';

export interface SignINProps {
    navigation?: any,
}

export default function SignINComponent(props: SignINProps) {

    const [Password, setPassword] = useState('');
    const [onPasswordFocus, setonPasswordFocus] = useState(false);
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

    const passwordValidation = (password: string) => {
        if (!(/^(?=.{6,})(?=.*[@#$%^&+=]).*$/.test(password)) || Password === '') {
            resetCall(true)
        } else {
            setPassword(password)
        }
    }

    const submit = () => {
        Alert.alert('Your response has been submitted!')
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
                value={Password}
                style={[styles.passwordField, { borderColor: onPasswordFocus ? Colors.socialColor : Colors.white }]}
                attrName={setPassword}
                updateMasterState={_updateMasterState}
                keyboardType={'default'}
                returnKeyType={'done'}
                placeholderStyle={Strings.loginEmailField}
                secureTextEntry={true}
                onSubmitEditing={() => { passwordValidation(Password), setonPasswordFocus(false) }}
                _handleFocus={setonPasswordFocus}
            />
            <CustomButton styleButton={styles.buttonStyle} pressMethod={submit} text={Strings.submit} Social={false} />
            {call &&
                <Toast top={-40} from={30} to={-40} message={Strings.inValidPassword} call={(value: boolean) => resetCall(value)} />
            }
        </View>
    );
};
