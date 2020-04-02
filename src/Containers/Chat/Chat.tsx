import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import styles from './styles'
import { Colors, vh, Strings, Images, vw, VectorIcons } from '../../Constants';
import { CustomTextInput, Toast, CustomButton } from '../../Components';
import { getResult } from '../../Modules/SignUP/Action';
import { userLoggedInFrom } from '../../Modules/SignUP/Action';
import ImagePicker from 'react-native-image-crop-picker';
import firebaseSDK from '../../Components/Firebase';

export interface ChatProps {
    navigation?: any,
}

export default function Chat(props: ChatProps) {

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuIconButton} onPress={() => props.navigation.openDrawer()} >
                    <VectorIcons.Ionicons name={'ios-arrow-back'} color={Colors.white} size={vh(25)} />
                </TouchableOpacity>
                <Text style={styles.moreSocial} > {Strings.signUp} </Text>
            </View>
        </View>
    );
};
