import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import styles from './styles'
import { Colors, vh, Strings, Images, vw, VectorIcons } from '../../Constants';
import { CustomTextInput, Toast, CustomButton } from '../../Components';
import { getResult, updateToken } from '../../Modules/SignUP/Action';
import { userLoggedInFrom } from '../../Modules/SignUP/Action';
import ImagePicker from 'react-native-image-crop-picker';
import firebaseSDK from '../../Components/Firebase';

export interface SignUpProps {
    navigation?: any,
}

export default function SignUp(props: SignUpProps) {
    const dispatch = useDispatch();

    const [newImage, setNewImage] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [call, setCall] = useState(false);
    const [newEmailFocus, setNewEmailFocus] = useState(false);
    const [newNameFocus, setNewNameFocus] = useState(false);
    const [onPasswordFocus, setonPasswordFocus] = useState(false);
    const [Loader, setLoader] = useState(false);
    const emailRef = React.createRef();
    const passwordRef = React.createRef(); 


    const resetCall = (value: boolean) => {
        setCall(value);
    };

    const _updateMasterState = (attrName: any, value: any) => {
        console.log(attrName, value)
        return attrName(value);
    }

    const emailValidation = (email: string) => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) || email === '') {
            resetCall(true)
        } else {
            setNewEmail(email)
        }
    }

    const passwordValidation = (password: string) => {
        if (!(/^(?=.{6,})(?=.*[@#$%^&+=]).*$/.test(password)) || password === '') {
            resetCall(true)
        } else {
            setPassword(password)
        }
    }

    const PickNewImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setNewImage(image.path);
            dispatch(
                getResult(
                    newEmail,
                    newName,
                    image.path,
                    () => { },
                ),
            );
        });
    }

    const userUid = (data: any) => {
        setLoader(false)
        setTimeout(() => {
            firebaseSDK.writeTheUserToDatabase(newName, newEmail, data, newImage)
            props.navigation.navigate('Chat', {
                name: newName,
                email: newEmail,
                imageURI: newImage,
                userId: data,
            });
        }, 1000);
        dispatch(updateToken(Math.random().toString()));
    }

    const CallSave = async () => {
        try {
            dispatch(
                getResult(
                    newEmail,
                    newName,
                    newImage,
                    () => { },
                ),
            );
            dispatch(userLoggedInFrom('Firebase'));
            setLoader(true)
            const user = {
                name: newName,
                email: newEmail,
                password: Password,
                imageURI: newImage,
            };
            firebaseSDK.createAccount(user, userUid);
        } catch ({ message }) {
            console.log(message)
            setLoader(false)
        }

    }

    return (
        <ImageBackground style={styles.container} source={Images.loginImage} >
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuIconButton} onPress={() => props.navigation.goBack()} >
                    <VectorIcons.Ionicons name={'ios-arrow-back'} color={Colors.white} size={vh(25)} />
                </TouchableOpacity>
                <Text style={styles.moreSocial} > {Strings.signUp} </Text>
            </View>
            <View>
                <Image source={newImage === '' ? Images.placeholderImage : { uri: newImage }} style={styles.image} />
                <TouchableOpacity style={styles.cameraStyle} onPress={PickNewImage} >
                    <Image source={Images.camera} style={styles.camera} />
                </TouchableOpacity>
            </View>

            <CustomTextInput
                value={newName}
                style={[styles.textField, { borderColor: newNameFocus ? Colors.socialColor : Colors.white }]}
                attrName={setNewName}
                updateMasterState={_updateMasterState}
                keyboardType={'default'}
                returnKeyType={'next'}
                placeholderStyle={Strings.name}
                secureTextEntry={false}
                onSubmitEditing={() => { setNewNameFocus(false), emailRef.current.focus() }}
                _handleFocus={() => setNewNameFocus(true)}
                _handleBlur={() => setNewNameFocus(false)}
            />
            <ActivityIndicator
                size={'large'}
                color={Colors.socialColor}
                animating={Loader}
                style={styles.indicator}
            />
            <CustomTextInput
                value={newEmail}
                style={[styles.textField, { borderColor: newEmailFocus ? Colors.socialColor : Colors.white, marginTop: vh(30) }]}
                attrName={setNewEmail}
                updateMasterState={_updateMasterState}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                placeholderStyle={Strings.EmailChange}
                secureTextEntry={false}
                onSubmitEditing={() => { emailValidation(newEmail), setNewEmailFocus(false), passwordRef.current.focus() }}
                _handleFocus={() => setNewEmailFocus(true)}
                _handleBlur={() => setNewEmailFocus(false)}
                ref={emailRef}
            />
            <CustomTextInput
                value={Password}
                style={[styles.textField, { borderColor: onPasswordFocus ? Colors.socialColor : Colors.white, marginTop: vh(30) }]}
                attrName={setPassword}
                updateMasterState={_updateMasterState}
                keyboardType={'default'}
                returnKeyType={'done'}
                placeholderStyle={Strings.Password}
                secureTextEntry={true}
                onSubmitEditing={() => { passwordValidation(Password), setonPasswordFocus(false) }}
                ref={passwordRef}
                _handleFocus={() => setonPasswordFocus(true)}
                _handleBlur={() => setonPasswordFocus(false)}
            />
            <CustomButton styleButton={styles.buttonStyle} pressMethod={CallSave} text={Strings.signUp} Social={false} />
            {call &&
                <Toast top={-40} from={30} to={-40} message={Strings.Invalid} call={(value: boolean) => resetCall(value)} />
            }
        </ImageBackground>
    );
};
