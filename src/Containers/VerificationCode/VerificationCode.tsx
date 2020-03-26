import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Images, Strings, Colors } from '../../Constants';
import { CustomTextInput, CustomButton } from '../../Components';

export interface SignINProps {
    navigation?: any,
}

export default function SignINComponent(props: SignINProps) {

    const [pin1, setpin1] = useState('');
    const [onFocusPin1, setonFocusPin1] = useState(false);
    const [pin2, setpin2] = useState('');
    const [onFocusPin2, setonFocusPin2] = useState(false);
    const [pin3, setpin3] = useState('');
    const [onFocusPin3, setonFocusPin3] = useState(false);
    const [pin4, setpin4] = useState('');
    const [onFocusPin4, setonFocusPin4] = useState(false);
    const [pin5, setpin5] = useState('');
    const [onFocusPin5, setonFocusPin5] = useState(false);
    const [pin6, setpin6] = useState('');
    const [onFocusPin6, setonFocusPin6] = useState(false);

    const pin1Ref = React.createRef();
    const pin2Ref = React.createRef();
    const pin3Ref = React.createRef();
    const pin4Ref = React.createRef();
    const pin5Ref = React.createRef();
    const pin6Ref = React.createRef();


    const goBack = () => {
        props.navigation.goBack();
    }
    const submit = () => {
        Alert.alert('Your response has been submitted!')
    }

    const _updateMasterState = (attrName: any, value: any) => {
        return attrName(value);
    }

    const _keyPress = (event: any, ref: any) => {
        if (event.nativeEvent.key === 'Backspace') {
            switch (ref) {
                case pin1Ref:
                    break;
                case pin2Ref:
                    pin1Ref.current.focus()
                    break;
                case pin3Ref:
                    pin2Ref.current.focus()
                    break;
                case pin4Ref:
                    pin3Ref.current.focus()
                    break;
                case pin5Ref:
                    pin4Ref.current.focus()
                    break;
                case pin6Ref:
                    pin5Ref.current.focus()
                    break;
                default:
                    break;
            }
        } else {
            switch (ref) {
                case pin1Ref:
                    pin2Ref.current.focus()
                    break;
                case pin2Ref:
                    pin3Ref.current.focus()
                    break;
                case pin3Ref:
                    pin4Ref.current.focus()
                    break;
                case pin4Ref:
                    pin5Ref.current.focus()
                    break;
                case pin5Ref:
                    pin6Ref.current.focus()
                    break;
                case pin6Ref:
                    break;
                default:
                    break;
            }
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity style={styles.backArrowButton} onPress={goBack} >
                    <Image source={Images.forgotPasswordBackArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerText} >{Strings.verification}</Text>
            </View>
            <Text style={styles.text} > {Strings.verifyText} </Text>
            <View style={styles.pinBoxView} >
                <CustomTextInput
                    value={pin1}
                    ref={pin1Ref}
                    style={[styles.pinField, { borderColor: onFocusPin1 ? Colors.socialColor : Colors.white }]}
                    attrName={setpin1}
                    updateMasterState={_updateMasterState}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    placeholderStyle={''}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setonFocusPin1(false) }}
                    _handleFocus={setonFocusPin1}
                    otherTextInputProps={{ maxLength: 1 }}
                    onKeyPress={_keyPress}
                />
                <CustomTextInput
                    value={pin2}
                    ref={pin2Ref}
                    style={[styles.pinField, { borderColor: onFocusPin2 ? Colors.socialColor : Colors.white }]}
                    attrName={setpin2}
                    updateMasterState={_updateMasterState}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    placeholderStyle={''}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setonFocusPin2(false) }}
                    _handleFocus={setonFocusPin2}
                    otherTextInputProps={{ maxLength: 1 }}
                    onKeyPress={_keyPress}
                />
                <CustomTextInput
                    value={pin3}
                    ref={pin3Ref}
                    style={[styles.pinField, { borderColor: onFocusPin3 ? Colors.socialColor : Colors.white }]}
                    attrName={setpin3}
                    updateMasterState={_updateMasterState}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    placeholderStyle={''}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setonFocusPin3(false) }}
                    _handleFocus={setonFocusPin3}
                    otherTextInputProps={{ maxLength: 1 }}
                    onKeyPress={_keyPress}
                />
                <CustomTextInput
                    value={pin4}
                    ref={pin4Ref}
                    style={[styles.pinField, { borderColor: onFocusPin4 ? Colors.socialColor : Colors.white }]}
                    attrName={setpin4}
                    updateMasterState={_updateMasterState}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    placeholderStyle={''}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setonFocusPin4(false) }}
                    _handleFocus={setonFocusPin4}
                    otherTextInputProps={{ maxLength: 1 }}
                    onKeyPress={_keyPress}
                />
                <CustomTextInput
                    value={pin5}
                    ref={pin5Ref}
                    style={[styles.pinField, { borderColor: onFocusPin5 ? Colors.socialColor : Colors.white }]}
                    attrName={setpin5}
                    updateMasterState={_updateMasterState}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    placeholderStyle={''}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setonFocusPin5(false) }}
                    _handleFocus={setonFocusPin5}
                    otherTextInputProps={{ maxLength: 1 }}
                    onKeyPress={_keyPress}
                />
                <CustomTextInput
                    value={pin6}
                    ref={pin6Ref}
                    style={[styles.pinField, { borderColor: onFocusPin6 ? Colors.socialColor : Colors.white }]}
                    attrName={setpin6}
                    updateMasterState={_updateMasterState}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    placeholderStyle={''}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setonFocusPin6(false), submit() }}
                    _handleFocus={setonFocusPin6}
                    otherTextInputProps={{ maxLength: 1 }}
                    onKeyPress={_keyPress}
                />
            </View>
            <CustomButton styleButton={styles.buttonStyle} pressMethod={submit} text={Strings.submit} Social={false} />
            <View style={styles.bottomTextView} >
                <Text style={styles.noCode} > {Strings.noCode} </Text>
                <Text style={styles.resend} > {Strings.resend} </Text>
            </View>

        </View>
    );
};
