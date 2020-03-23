import FBSDK from 'react-native-fbsdk'
import { Alert } from 'react-native'

const {AccessToken, GraphRequest, GraphRequestManager, LoginManager } = FBSDK

export function fbLogin(dataCallback: Function, errorCallback: Function) {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        (result: any) => {
            if (result.isCancelled) {
                Alert.alert('Login cancelled');
                errorCallback('cancel');
            } else {
                Alert.alert(
                    'Login success with permissions: ' +
                    result.grantedPermissions.toString(),
                );
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