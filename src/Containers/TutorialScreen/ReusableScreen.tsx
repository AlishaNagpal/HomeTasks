import React, { useState } from 'react';
import { Text, ImageBackground, TouchableOpacity, ActivityIndicator, View, Image } from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from '../../Constants';

export interface SplashProps {
    swipe: boolean,
    heading: string,
    text: string,
    id: number,
    image: any
}

export default function SignUP(props: SplashProps) {

    return (
        <View style={styles.container} >
            <Image source={props.image} style={styles.backgroundImage} />
        </View>
    );
}