import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles'
import { Colors, vh, Strings, Images, vw } from '../../Constants';
import { CustomTextInput, Toast } from '../../Components';
import { getResult } from '../../Modules/SignUP/Action';
import { ProfileDataOverHere } from '../../Modules/Profile/ProfileAction';
import ImagePicker from 'react-native-image-crop-picker';
import firebaseSDK from '../../Components/Firebase';

export interface ProfileProps {
    navigation?: any,
}

export default function Home(props: ProfileProps) {
    const { result, LoginFrom, userUID } = useSelector((state: { SignUpReducer: any }) => ({
        result: state.SignUpReducer.result,
        LoginFrom: state.SignUpReducer.LoginFrom,
        userUID: state.SignUpReducer.userUID,

    }));
    const { profileData } = useSelector((state: { ProfileReducer: any }) => ({
        profileData: state.ProfileReducer.profileData,
    }));

    console.log(result.profilePic)

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [call, setCall] = useState(false);
    const [newImage, setNewImage] = useState(result.profilePic);
    const [newName, setNewName] = useState(result.name);
    const [newBio, setNewBio] = useState(profileData.bio);
    const [newEmail, setNewEmail] = useState(result.email);
    const [newNumber, setNewNumber] = useState(profileData.phoneNumber);
    const [newEmailFocus, setNewEmailFocus] = useState(false);
    const [newNumberFocus, setNewNumberFocus] = useState(false);
    const [newNameFocus, setNewNameFocus] = useState(false);
    const [newBioFocus, setNewBioFocus] = useState(false);
    const BioRef = React.createRef();
    const emailRef = React.createRef();
    const numberRef = React.createRef();


    const resetCall = (value: boolean) => {
        setCall(value);
    };

    const _updateMasterState = (attrName: any, value: any) => {
        return attrName(value);
    }

    const emailValidation = (email: string) => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) || email === '') {
            resetCall(true)
        } else {
            setNewEmail(email)
        }
    }

    const CallSave = () => {
        dispatch(
            getResult(
                newEmail,
                newName,
                newImage,
                () => { },
            ),
        );
        dispatch(
            ProfileDataOverHere(
                newBio,
                newNumber,
            ),
        );
        console.log('in profile', newName, newEmail, userUID, newImage)
        firebaseSDK.writeTheUserToDatabase(newName, newEmail, userUID, newImage)
    }

    const makeItEditable = () => {
        if (edit) {
            CallSave()
            setEdit(false)
        } else {
            setEdit(true)
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

    return (
        <ImageBackground style={styles.container} source={Images.blurMapBackground} >
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuIconButton} onPress={() => props.navigation.openDrawer()} >
                    <Image source={Images.menuIcon} style={styles.menuIcon} />
                </TouchableOpacity>
                <Text style={styles.moreSocial} > {Strings.profile} </Text>
                <TouchableOpacity style={styles.searchIconButton} onPress={makeItEditable} >
                    <Text style={styles.edit} > {edit ? Strings.save : Strings.edit} </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Image
                    source={newImage ? { uri: newImage } : Images.placeholderImage}
                    // source={{ uri: newImage }}
                    style={styles.image}
                />
                {edit &&
                    <TouchableOpacity style={styles.cameraStyle} onPress={PickNewImage} >
                        <Image source={Images.camera} style={styles.camera} />
                    </TouchableOpacity>
                }
            </View>

            <View>
                <CustomTextInput
                    value={result.name}
                    style={[styles.textField, { borderColor: newNameFocus ? Colors.socialColor : Colors.white }]}
                    attrName={setNewName}
                    updateMasterState={_updateMasterState}
                    keyboardType={'default'}
                    returnKeyType={'next'}
                    placeholderStyle={Strings.name}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setNewNameFocus(false), BioRef.current.focus() }}
                    _handleFocus={() => setNewNameFocus(true)}
                    _handleBlur={() => setNewNameFocus(false)}
                    otherTextInputProps={{ editable: edit }}
                />
                {!edit &&
                    <Image source={Images.approved} style={styles.approved} />
                }
            </View>
            <CustomTextInput
                value={profileData.bio}
                style={[styles.BiotextField, { borderColor: newBioFocus ? Colors.socialColor : Colors.white }]}
                attrName={setNewBio}
                updateMasterState={_updateMasterState}
                keyboardType={'default'}
                returnKeyType={'next'}
                placeholderStyle={Strings.bio}
                secureTextEntry={false}
                onSubmitEditing={() => { setNewBioFocus(false), emailRef.current.focus() }}
                _handleFocus={() => setNewBioFocus(true)}
                _handleBlur={() => setNewBioFocus(false)}
                otherTextInputProps={{ editable: edit, multiline: true }}
                ref={BioRef}
            />
            <CustomTextInput
                value={result.email}
                style={[styles.textField, { borderColor: newEmailFocus ? Colors.socialColor : Colors.white, marginTop: vh(10) }]}
                attrName={setNewEmail}
                updateMasterState={_updateMasterState}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                placeholderStyle={Strings.EmailChange}
                secureTextEntry={false}
                onSubmitEditing={() => { emailValidation(newEmail), setNewEmailFocus(false), numberRef.current.focus() }}
                _handleFocus={() => setNewEmailFocus(true)}
                _handleBlur={() => setNewEmailFocus(false)}
                otherTextInputProps={{ editable: edit }}
                ref={emailRef}
            />
            <View>
                <CustomTextInput
                    value={profileData.phoneNumber}
                    style={[styles.textField, { borderColor: newNumberFocus ? Colors.socialColor : Colors.white, marginTop: vh(10), paddingLeft: vw(60), }]}
                    attrName={setNewNumber}
                    updateMasterState={_updateMasterState}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    placeholderStyle={Strings.number}
                    secureTextEntry={false}
                    onSubmitEditing={() => { setNewNumberFocus(false) }}
                    _handleFocus={() => setNewNumberFocus(true)}
                    _handleBlur={() => setNewNumberFocus(false)}
                    otherTextInputProps={{ editable: edit }}
                    ref={numberRef}
                />
                <Text style={styles.number}> {Strings.countryCode} </Text>
            </View>
            <View style={styles.socialLogin} >
                <View style={styles.facebook}>
                    <Image source={Images.fb} style={styles.fbIcon} />
                </View>
                <Text style={styles.url} > {LoginFrom === 'Facebook' ? Strings.fbUrl : Strings.connectFb}</Text>
            </View>
            <View style={styles.socialLogin} >
                <View style={styles.linkedIn}>
                    <Image source={Images.linkedIn} style={styles.linkedInIcon} />
                </View>
                <Text style={styles.url} > {LoginFrom === 'LinkedIN' ? Strings.LinkedInUrl : Strings.connectLi}</Text>
            </View>
            {call &&
                <Toast top={-40} from={30} to={-40} message={Strings.validEmail} call={(value: boolean) => resetCall(value)} />
            }
        </ImageBackground>
    );
};
