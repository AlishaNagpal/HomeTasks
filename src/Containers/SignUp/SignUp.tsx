import React from 'react';
import { Text, ImageBackground } from 'react-native';
import styles from './styles';
import { VectorIcons, Colors, Strings, vh, Images } from '../../Constants';

export default function SignUP() {
    return (
        <ImageBackground
        source={Images.mainScreen}
        style={styles.container}
    >
            <VectorIcons.MaterialCommunityIcons name={'worker'} color={Colors.white} size={vh(150)} />
            <Text style={styles.exercise} >{Strings.signUpWork}</Text>
        </ImageBackground>
    );
};
