import React, { useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import styles from './styles';
import { Images, Strings } from '../../Constants';
import { CustomButton } from '../../Components';

export interface SignINProps {
    navigation?: any,
}

export default function verifiedSuccesfully(props: SignINProps) {
    const ticking = new Animated.Value(0);

    useEffect(() => {
        tick()
    });

    const tick = () => {
        Animated.timing(ticking, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.bounce,
            delay: 400
        }).start(()=>tick());
    }

    const logoScale = ticking.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 1],
        extrapolate: 'clamp'
    })


    const proceed = () => {
        props.navigation.navigate('ResetPassword');
    }

    return (
        <View style={styles.container}>
            <Animated.Image source={Images.verifiedSuccesfully} style={[styles.key, { transform: [{ scale: logoScale }] }]} />
            <Text style={styles.verified} > {Strings.verified} </Text>
            <Text style={styles.text} > {Strings.verifiedText} </Text>
            <CustomButton styleButton={styles.buttonStyle} pressMethod={proceed} text={Strings.proceed} Social={false} />
        </View>
    );
};
