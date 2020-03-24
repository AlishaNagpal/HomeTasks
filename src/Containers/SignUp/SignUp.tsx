import React, { useState } from 'react';
import { Button, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import * as  SocialLogin from '../../Components/SocialLoginHandler'
import { useDispatch } from 'react-redux';
import { updateToken, getResult } from '../../Modules/SignUP/Action';
import { Images, Colors } from '../../Constants';
import LinkedInModal from 'react-native-linkedin';
import axios from 'axios';

const clientID = '811gwurpdk8j4u';
const clientSecret = 'hCuO7WVUGJcpGPRx';
const redirectUri = 'https://www.linkedin.com/home/';

interface AppProps {
    navigation?: any
};

export default function SignUP(props: AppProps) {
    const dispatch = useDispatch()
    const [isAnimating, setisAnimating] = useState(false);
    let linkedRef = React.createRef<LinkedInModal>();

    const data = (token: any, result: any) => {
        dispatch(
            getResult(result.email, result.name, result.picture.data.url, () => {
                setisAnimating(false);
                dispatch(updateToken(token));
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
        console.log('getting data', token, email, result)
        dispatch(
            getResult(
                email,
                result.localizedFirstName + ' ' + result.localizedLastName,
                result.profilePicture['displayImage~'].elements[3].identifiers[0]
                    .identifier,
                () => {
                    setisAnimating(false);
                    dispatch(updateToken(token));
                },
            ),
        );
    };

    const renderButton = () => {
        return (
            <TouchableOpacity  onPress={() => linkedRef.current.open()}>
                <Text style={styles.linkedInStyle}>LinkedIn</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            source={Images.mainScreen}
            style={styles.container}
        >
            <ActivityIndicator
                animating={isAnimating}
                size="large"
                color={Colors.white}
            />
            <TouchableOpacity onPress={login} >
                <Text style={styles.textStyle} >FaceBook</Text>
            </TouchableOpacity>
            <LinkedInModal
                ref={linkedRef}
                renderButton={renderButton}
                shouldGetAccessToken={true}
                clientID={clientID}
                clientSecret={clientSecret}
                redirectUri={redirectUri}
                linkText={'LinkedIN'}
                permissions={['r_liteprofile', 'r_emailaddress']}
                onSuccess={(token: any) => {
                    console.log('token ', token.access_token);
                    axios
                        .get(
                            'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
                            {
                                headers: {
                                    Authorization: `Bearer ${token.access_token}`,
                                },
                            },
                        )
                        .then((res: any) => {
                            console.log('res ', res.data);
                            axios
                                .get(
                                    'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))',
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token.access_token}`,
                                        },
                                    },
                                )
                                .then((response: any) => {
                                    console.log('email ', response);
                                    liData(
                                        token.access_token,
                                        response.data.elements[0]['handle~'].emailAddress,
                                        res.data,
                                    );
                                });
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });
                }}
            />
        </ImageBackground>
    );
};
