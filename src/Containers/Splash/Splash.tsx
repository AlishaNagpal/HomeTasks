import React, { useEffect } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { splashToken } from '../../Modules/Splash/Action';
import { Colors, Images } from '../../Constants'
import LinearGradient from 'react-native-linear-gradient';

const colors = [Colors.goldenYellow, Colors.goldenYellow, Colors.darkishYellow, Colors.bronzedYellow, Colors.brown]

export interface SplashProps { }

export default function SignUP(props: SplashProps) {

    let banner: any;

    banner = new Animated.Value(0);

    const { splashRan } = useSelector((state: { SplashReducer: any }) => ({
        splashRan: state.SplashReducer.splashRan,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        Animated.timing(banner, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            dispatch(splashToken(true))
        }, 300);
    });
    const logoScale = banner.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 1]
    })
    const textTurn = banner.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    return (
        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={colors} style={styles.container}>
            <Animated.Image
                style={[styles.logoImage, { transform: [{ scale: logoScale }] }]}
                source={Images.splash} />
            <Animated.Text style={[styles.text, { transform: [{ rotate: textTurn }] }]} >
                HomeTasks
                </Animated.Text>
        </LinearGradient>
    );
}
