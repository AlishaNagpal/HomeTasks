import React, { useEffect } from 'react';
import { Animated, ImageBackground, Text, Easing } from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {splashToken} from '../../Modules/Splash/Action';
import {Images, Strings} from '../../Constants'

export interface SplashProps { }

export default function SignUP(props: SplashProps) {
    let banner: any;
    banner = new Animated.Value(0);
    // const { splashRan } = useSelector((state: { SplashReducer: any }) => ({
    //     splashRan: state.SplashReducer.splashRan,
    // }));

    const dispatch = useDispatch();

    useEffect(() => {
        Animated.timing(banner, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing:Easing.bounce,
        }).start();
        setTimeout(() => {
            dispatch(splashToken(true))
        }, 300);
    });
    const logoScale = banner.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 1],
        extrapolate: 'clamp'
    })
    return (
        <ImageBackground
            style={styles.container}
            source={Images.splash}>
            <Text style={styles.moreSocial} >{Strings.appName}</Text>
            <Text style={styles.tagLine}>{Strings.appTagLine}</Text>
            <Animated.Image
                style={[styles.logoImage, { transform: [{ scale: logoScale }] }]}
                source={Images.splashLogo} />
        </ImageBackground>
    );
}
