import React, { useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, Image } from 'react-native';
import { Strings, Images, Colors, VectorIcons, vh } from '../../Constants';
import styles from './styles';
import * as  SocialLogin from '../../Components/SocialLoginHandler'
import { useDispatch } from 'react-redux';
import { updateToken, getResult, userLoggedInFrom } from '../../Modules/SignUP/Action';
import CustomButton from '../../Components/CustomButtons';

interface TutorialScreenProps {
    navigation?: any,
};

export default function SignUP(props: TutorialScreenProps) {
    const dispatch = useDispatch()
    const [isAnimating, setisAnimating] = useState(false);

    const SignUp = () => {
        props.navigation.navigate('SignUP');
        setisAnimating(false);
    }

    const SignIn = () => {
        props.navigation.navigate('SignIn');
        setisAnimating(false);
    }

    const data = (token: any, result: any) => {
        dispatch(
            getResult(result.email, result.name, result.picture.data.url, () => {
                setisAnimating(false);
                dispatch(updateToken(token));
                dispatch(userLoggedInFrom('Facebook'));
            }),
        );
    }
    const errorCallback = (error: any) => {
        console.log(error);
        setisAnimating(false);
    }

    const login = () => {
        SocialLogin.fbLogin(data, errorCallback)
        setisAnimating(true)
    }

    const liData = (token: string, email: string, result: any) => {
        dispatch(
            getResult(
                email,
                result.localizedFirstName + ' ' + result.localizedLastName,
                result.profilePicture['displayImage~'].elements[3].identifiers[0]
                    .identifier,
                () => {
                    setisAnimating(false);
                    dispatch(updateToken(token));
                    dispatch(userLoggedInFrom('LinkedIN'));
                },
            ),
        );
    };

    const renderData = (rowData: any) => {
        const { item } = rowData;
        return (
            <View style={styles.container} >
                <Image source={item.image} style={styles.backgroundImage} />
                <View style={styles.mainHeading}>
                    {item.swipe ?
                        <View style={styles.swipeHeading} >
                            <Text style={styles.swipe} >{item.heading}</Text>
                            <Image source={Images.swipe} style={styles.swipeImage} />
                        </View>

                        : <View style={styles.tutorialHeading} >
                            <Text style={styles.heading} > {item.heading} </Text>
                            <Text style={styles.text} > {item.text} </Text>
                        </View>}
                    <View style={styles.dotView} >
                        <VectorIcons.FontAwesome name={'circle'} size={vh(10)} color={item.id === 1 ? Colors.white : Colors.inactiveDot} />
                        <VectorIcons.FontAwesome name={'circle'} size={vh(10)} color={item.id === 2 ? Colors.white : Colors.inactiveDot} style={styles.dot} />
                        <VectorIcons.FontAwesome name={'circle'} size={vh(10)} color={item.id === 3 ? Colors.white : Colors.inactiveDot} style={styles.dot} />
                        <VectorIcons.FontAwesome name={'circle'} size={vh(10)} color={item.id === 4 ? Colors.white : Colors.inactiveDot} style={styles.dot} />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={DATA}
                keyExtractor={(item, index) => (item.id + index).toString()}
                renderItem={renderData}
                horizontal={true}
                bounces={false}
                pagingEnabled={true}
                disableIntervalMomentum={true}
                initialNumToRender={1}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.mainHeading} >
                <Text style={styles.moreSocial} >{Strings.appName}</Text>
                <Text style={styles.tagLine}>{Strings.appTagLine}</Text>
                <ActivityIndicator
                    animating={isAnimating}
                    size="large"
                    color={Colors.white}
                    style={styles.indicator}
                />
                <View style={styles.buttons} >
                    <CustomButton styleButton={styles.facebook} pressMethod={login} image={Images.fb} text={Strings.facebookLogin} Social={true} />
                    {SocialLogin.linkedInLogin(liData, 1)}
                    <View style={styles.oldSchool} >
                        <CustomButton styleButton={styles.signIn} pressMethod={SignIn} text={Strings.signIn} Social={false} />
                        <CustomButton styleButton={styles.signUp} pressMethod={SignUp} text={Strings.signUp} Social={false} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const DATA = [
    {
        swipe: true,
        heading: Strings.Swipe,
        text: '',
        id: 1,
        image: Images.TutorialScreen1,
    },
    {
        swipe: false,
        heading: Strings.Explore,
        text: Strings.ExploreText,
        id: 2,
        image: Images.TutorialScreen2,
    },
    {
        swipe: false,
        heading: Strings.Connect,
        text: Strings.ConnectText,
        id: 3,
        image: Images.TutorialScreen3,
    },
    {
        swipe: false,
        heading: Strings.Grow,
        text: Strings.GrowText,
        id: 4,
        image: Images.TutorialScreen4,
    },
]