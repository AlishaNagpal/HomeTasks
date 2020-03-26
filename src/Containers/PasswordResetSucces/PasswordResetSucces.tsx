import React, { useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import styles from './styles';
import { Images, Strings } from '../../Constants';
import { CustomButton } from '../../Components';

export interface SignINProps {
    navigation?: any,
}

export default function PasswordResetSucces(props: SignINProps) {
    const verify = new Animated.Value(0);

    useEffect(() => {
        tick()
    });

    const tick = () => {
        Animated.timing(verify, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.bounce,
            delay: 400
        }).start(()=>tick());
    }

    const logoScale = verify.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })


    const proceed = () => {
        props.navigation.pop(4);
    }

    return (
        <View style={styles.container}>
            <Animated.Image source={Images.verifiedSuccesfully} style={[styles.key, { transform: [{ scale: logoScale }] }]} />
            <Text style={styles.verified} > {Strings.resetSucces} </Text>
            <Text style={styles.text} > {Strings.resetSuccesText} </Text>
            <CustomButton styleButton={styles.buttonStyle} pressMethod={proceed} text={Strings.signIn} Social={false} />
        </View>
    );
};
