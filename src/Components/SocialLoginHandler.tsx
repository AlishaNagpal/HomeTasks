import FBSDK from 'react-native-fbsdk'
import { Alert } from 'react-native'

const {AccessToken, GraphRequest, GraphRequestManager, LoginManager } = FBSDK
import LinkedInModal from 'react-native-linkedin';

const clientID = '811gwurpdk8j4u';
const clientSecret = 'hCuO7WVUGJcpGPRx';
const redirectUri = 'https://www.linkedin.com/home/';

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

export function logOut() {
    LoginManager.logOut();
    Alert.alert('You have been Logged out!');
}

export function linkedInLogin() {
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
  
    return (
      <LinkedInModal
        shouldGetAccessToken={true}
        clientID={clientID}
        clientSecret={clientSecret}
        redirectUri={redirectUri}
        onSuccess={token => {
          console.log('token', token);
        }}
      />
    );
  }