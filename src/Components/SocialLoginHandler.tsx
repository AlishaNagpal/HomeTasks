import React from 'react';
import FBSDK from 'react-native-fbsdk'
import { Alert, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { vh, vw, Colors, Strings, Images } from '../Constants';
import LinkedInModal from 'react-native-linkedin';
import axios from 'axios';

const wi = Dimensions.get('screen').width
const { AccessToken, GraphRequest, GraphRequestManager, LoginManager } = FBSDK
const clientID = '811gwurpdk8j4u';
const clientSecret = 'hCuO7WVUGJcpGPRx';
const redirectUri = 'https://www.linkedin.com/home/';

export function fbLogin(dataCallback: Function, errorCallback: Function) {

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        (result: any) => {
            if (result.isCancelled) {
                // Alert.alert('Login cancelled');
                errorCallback('cancel');
            } else {
                // Alert.alert(
                //     'Login success with permissions: ' +
                //     result.grantedPermissions.toString(),
                // );
            }
            {
                if (!result.isCancelled) {
                    AccessToken.getCurrentAccessToken().then((data: any) => {
                        let accessToken = data.accessToken;
                        const responseInfoCallback = (error: any, result: any) => {
                            if (error) {
                                Alert.alert('Unable to Login, Please try again!', error);
                                errorCallback(error);
                            } else {
                                // console.log('Success fetching data: ' + JSON.stringify(result));
                                // console.log('FB PIC', result.picture.data.url);
                                dataCallback(accessToken.toString(), result);
                            }
                        };

                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken,
                                parameters: {
                                    fields: {
                                        string:
                                            'email,name,first_name,middle_name,last_name,picture.type(large)',
                                    },
                                },
                            },
                            responseInfoCallback,
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                    });
                }
            }
        },
        function (error) {
            Alert.alert('Login fail with error: ' + error);
            errorCallback(error);
        },
    );
}

export function logOut() {
    LoginManager.logOut();
}

export function linkedInLogin(callBack: Function, num: number) {
    const linkedRef = React.createRef<LinkedInModal>();
    // axios
    //   .get(
    //     `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&scope=r_liteprofile%20r_emailaddress%20w_member_social`,
    //   )
    //   .then(res => {
    //     console.log('res ', res);
    //   })
    //   .catch(error => {
    //     console.log('error ', error);
    //   });

    // Linking.openURL(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&scope=r_liteprofile%20r_emailaddress%20w_member_social`)
    const renderButton = () => {
        if (num === 1) {
            return (
                <TouchableOpacity style={styles.linkedIn} onPress={() => linkedRef.current.open()} >
                    <Image source={Images.linkedIn} style={styles.imageStyle} />
                    <Text style={styles.line} >I</Text>
                    <Text style={styles.socialText} > {Strings.linkedLogin} </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.linkedIn2} onPress={() => linkedRef.current.open()} >
                    <Image source={Images.linkedIn} style={styles.linkedInIcon} />
                </TouchableOpacity>
            )
        }
    };
    return (
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
                // console.log('token ', token.access_token);
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
                        // console.log('res ', res.data);
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
                                // console.log('email ', response);
                                callBack(token.access_token,
                                    response.data.elements[0]['handle~'].emailAddress,
                                    res.data);
                            });
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            }}
        />
    );
}

const styles = StyleSheet.create({
    linkedIn: {
        marginLeft: vw(38),
        marginRight: vw(38),
        height: vh(43),
        backgroundColor: Colors.linkedIn,
        width: vw(wi - 76),
        borderRadius: vw(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: vh(20.5),
        flexDirection: 'row'
    },
    imageStyle: {
        marginLeft: vw(-30),
        marginRight: vw(12.5),
        height: vh(25),
        width: vw(25),
        resizeMode: 'contain'
    },
    line: {
        color: Colors.white,
        fontSize: vh(30),
        width: vw(3)
    },
    socialText: {
        color: Colors.white,
        fontFamily: 'Poppins-Regular',
        textTransform: 'uppercase',
        fontSize: vh(16),
        marginLeft: vw(35)
    },
    linkedIn2: {
        height: vh(42),
        width: vh(42),
        borderRadius: vh(21),
        backgroundColor: Colors.linkedIn,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkedInIcon: {
        height: 21,
        width: 22
    }
});
