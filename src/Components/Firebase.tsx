import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Platform, Alert } from 'react-native';
import moment from 'moment';

// const uid = auth().currentUser.uid;
// const ref = database().ref(`/users/${uid}`);
// const snapshot = await ref.once('value');

class FirebaseSDK {

    constructor() {
        if (!firebase.apps.length) { // this thing is impotant, to not to re-intiliaze app 
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
        try {
            await auth().signInWithEmailAndPassword(user.email, user.password)
                .then(success_callback, failed_callback);
        } catch (e) {
            console.error(e.message);
        }
    };

    // write the user to the database
    writeTheUserToDatabase = (name: string, email: string, uid: string, image: string) => {
        database().ref('Users/' + uid).set({
            email,
            name,
            uid,
            image,
        }).then((data: any) => {
            console.log('data ', data)
        }).catch((error: any) => {
            console.log('error ', error)
        })
    }

    // creating my account
    createAccount = (user: any, callback: Function) => {
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(
                function () {
                    // console.log('created user successfully. User email:' + user.email + ' name:' + user.name);
                    const userf = auth().currentUser
                    // @ts-ignore
                    callback(userf._user.uid)
                    // ,userf.updateProfile({ displayName: user.name }).then(
                    //     function () {
                    //         console.log('Updated displayName successfully. name:' + user.name, user);
                    //     },
                    //     function (error: any) {
                    //         console.warn('Error update displayName.');
                    //     }
                    // );
                },
                function (error: any) {
                    console.error('got error:' + typeof error + ' string:' + error.message);
                }
            )
    };

    // reading entire users
    readUserData(callback: Function) {
        database().ref('Users/').on('value', function (snapshot: any) {
            callback(snapshot.val())
        })
    }

    /*
    * One On One Chat Stuff 
    * It is happening people
    *  
    */

    // Load msgs from Database to Chat, first 20 messages to be loaded people
    refOn = (chatPerson: string, callback: Function) => {
        const onReceive = (data: any) => {
            // console.log('in refON receive,  ',data._snapshot)
            if (data._snapshot.value) {
                const message = data._snapshot.value;
                const keys = Object.keys(message)
                const messages = [];

                for (let i = 0; i < keys.length; i++) {
                    const a = keys[i]
                    const mess = message[a]
                    const msg = { mess, id: a }
                    messages.push(msg)
                }
                callback(messages)
            }
        };

        database().ref('ChatRooms/' + chatPerson) // good for personal ones 
            .limitToLast(20)
            .on('value', onReceive);
    }

    // Trying to get the previous data, its for loading earlier messages

    getPreviousMessages = (chatPerson: string, lastMessageKey: string, callback: Function) => {
        const onReceive = (data: any) => {
            // console.log('in getting previous messages',data)
            if (data._snapshot.value) {
                const message = data.val();
                let keys = Object.keys(message)
                let messages = [];
                for (let i = 0; i < keys.length; i++) {
                    let a = keys[i]
                    let mess = message[a]
                    let msg = { mess, id: a }
                    messages.push(msg)
                }
                callback(messages)
            }
        };

        database().ref('ChatRooms/')
            .child(chatPerson)
            // .orderByKey()
            .limitToLast(20)
            .endAt(lastMessageKey)
            .on('value', onReceive);
    }

    // Storing msgs on Firebase Database
    send = (messages: any) => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];

            const dated = moment()
                .utcOffset('+05:30')
                .format(' hh:mm a');

            const DayTime = moment()
                .utcOffset('+05:30')
                .format('DD MMM,YYYY');

            const message = { text, user, gettingTime: dated, createdAt: new Date().getTime(), onDay: DayTime, messageRead: false };
            database().ref('ChatRooms/' + user.idRoom).push(message)

            // for Inbox, loading last messages
            const inboxThisMessage = { text, gettingTime: dated, createdAt: new Date().getTime(), id: user._id, otherId: user.otherID, thisName: user.name, otherName: user.otherPersonName, unreadMessages: 0 }
            const inboxOtherMessage = { text, gettingTime: dated, createdAt: new Date().getTime(), id: user.otherID, otherId: user._id, thisName: user.otherPersonName, otherName: user.name, unreadMessages: 0 }
            database().ref('Inbox/' + 'OneonOne/' + user._id + '/' + user.otherID).set(inboxThisMessage)
            database().ref('Inbox/' + 'OneonOne/' + user.otherID + '/' + user._id).set(inboxOtherMessage)

        }
    };

    // Changing the value of the typing text
    ChangeTypingText = (chatRoomId: string, personalID: string, value: any) => {
        database().ref('Typing/' + chatRoomId + '/' + personalID + '/' + 'typing').set(value)
    };

    // getting typing value
    getTypingValue = (chatRoomID: string, chatPerson: string, callback: Function) => {
        database().ref('Typing/' + chatRoomID + '/' + chatPerson + '/' + 'typing')
            .on('value', (snapshot: any) => { callback(snapshot.val()) });
    };

    // reading last messages
    readInboxData(uid: string, callback: Function) {
        database().ref('Inbox/' + 'OneonOne/').child(uid).on('value', function (snapshot: any) {
            callback(snapshot.val())
        })
    }

    // making the messages of other as read
    readingMessages = (chatPerson: string, otherPersonID: string, callBack: Function) => {
        const onReceive = (data: any) => {
            if (data._snapshot.value) {
                const message = data._snapshot.value;
                const keys = Object.keys(message)
                const messages = [];

                for (let i = 0; i < keys.length; i++) {
                    const a = keys[i]
                    const mess = message[a]
                    const msg = { mess, id: a }
                    if (msg.mess.user.otherID !== otherPersonID) {
                        messages.push(msg)
                    }
                }
                callBack(messages)
            }
        };

        database().ref('ChatRooms/' + chatPerson) // good for personal ones 
            .limitToLast(20)
            .on('value', onReceive);
    }

    // making the messages true
    makeMessagesRead = (roomID: string, messageID: string) => {
        database().ref('ChatRooms/' + roomID + '/' + messageID).child('messageRead').set(true)
    }

    // getting unread messages

    unreadMessages = (chatPerson: string, otherPersonID: string, callBack: Function) => {
        const onReceive = (data: any) => {
            if (data._snapshot.value) {
                const message = data._snapshot.value;
                const keys = Object.keys(message)
                const messages = [];

                for (let i = 0; i < keys.length; i++) {
                    const a = keys[i]
                    const mess = message[a]
                    const msg = { mess, id: a }
                    if (msg.mess.user.otherID !== otherPersonID && msg.mess.messageRead === false) {
                        messages.push(msg)
                    }
                }
                callBack(messages.length)
            }
        };

        database().ref('ChatRooms/' + chatPerson)
            .on('value', onReceive);
    }

    // counting the messages here
    unreadMessageCount = (userUID: string, otherPersonUID: string, unread: number) => {
        database().ref('Inbox/' + 'OneonOne/' + userUID + '/' + otherPersonUID).child('unreadMessages').set(unread)
    }

    // Delete Message
    deleteMessages = (chatPerson: string, deleteKey: string) => {
        database().ref('ChatRooms/' + chatPerson).child(deleteKey).remove()
    }

    // Delete ChatThread
    deleteChatThread = (userID: string, chatroomId: string, otherPersonID: string) => {
        const createdAt = new Date().getTime()
        database().ref('Delete/' + userID + '/' + chatroomId + '/LatestMessage').set(createdAt)
        database().ref('Inbox/' + 'OneonOne/' + userID + '/' + otherPersonID).remove()
    }

    // getting delete node info
    deleteNodeInfo = (userID: string, roomKey: string, callback:Function) => {
        database().ref('Delete/' + userID + '/' + roomKey + '/LatestMessage')
        .on('value', (snapshot: any) => { callback(snapshot.val()) });
    }
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;