import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Platform, Alert } from 'react-native';

// const uid = auth().currentUser.uid;
// const ref = database().ref(`/users/${uid}`);
// const snapshot = await ref.once('value');

class FirebaseSDK {

    constructor() {
        if (!firebase.apps.length) {
            //avoid re-initializing
            firebase.initializeApp({
                apiKey: 'AIzaSyA3dIMYoQgB92dYly7wUiAND_9HoqKbPWQ',
                appId: Platform.OS === 'ios'
                    ? '1:296447278093:web:11d8d06447e9516cdee944'
                    : '1:296447278093:android:3afcdcf9f17f891cdee944',
                databaseURL: 'https://hometasks-a67b0.firebaseio.com',
                messagingSenderId: '296447278093',
                projectId: 'hometasks-a67b0',
                storageBucket: 'hometasks-a67b0.appspot.com',
            },
                'hometasks');
        }
    }
    login = async (user: any, success_callback: any, failed_callback: any) => {
        console.log('in login') 
        try {
            await auth().signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
        } catch (e) {
            console.error(e.message);
        }
        // firebase
        //     .auth()
        //     .signInWithEmailAndPassword(user.email, user.password)
        //     .then(success_callback, failed_callback);
    };

    // writeTheUserToDatabase = (name: string, email: string, uid: string, image: string) => {
    //     let selected = false
    //     firebase.database().ref('Users/' + uid).set({
    //         email,
    //         name,
    //         uid,
    //         image,
    //         selected,
    //     }).then((data: any) => {
    //         console.log('data ', data)
    //     }).catch((error: any) => {
    //         console.log('error ', error)
    //     })
    // }

    // createAccount = (user: any, callback: Function) => {
    //     console.log('in here')
    //     firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(user.email, user.password)
    //         .then(
    //             function () {
    //                 console.log('created user successfully. User email:' + user.email + ' name:' + user.name);
    //                 var userf = firebase.auth().currentUser
    //                 //@ts-ignore
    //                 callback(userf._user.uid),
    //                     //@ts-ignore
    //                     userf.updateProfile({ displayName: user.name }).then(
    //                         function () {
    //                             console.log('Updated displayName successfully. name:' + user.name, user);
    //                         },
    //                         function (error: any) {
    //                             console.warn('Error update displayName.');
    //                         }
    //                     );
    //             },
    //             function (error: any) {
    //                 console.error('got error:' + typeof error + ' string:' + error.message);
    //                 Alert.alert('Create account failed. Error: ' + error.message);
    //             }
    //         )
    // };

    //reading entire users
    readUserData(callback: Function) {
        firebase.database().ref('Users/').on('value', function (snapshot: any) {
            callback(snapshot.val())
        })
    }
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;