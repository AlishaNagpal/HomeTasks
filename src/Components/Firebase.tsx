import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Platform } from 'react-native';
import moment from 'moment';
import storage from '@react-native-firebase/storage';


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
                },
                function (error: any) {
                    console.error('got error:' + typeof error + ' string:' + error.message);
                }
            )
    };

    // saving the users picture in the storage
    savePictureInStorage = async (localPath: string, userUID: string, callback: Function) => {
        if (localPath !== '') {
            const ref = storage().ref('UserImages').child(userUID);
            return ref
                .putFile(localPath, { contentType: 'jpg' })
                .then(() => {
                    return ref.getDownloadURL();
                })
                .then(url => {
                    callback(url)
                })
                .catch(err => {
                    console.log('error in storage upload picture', err)
                })
        } else {
            callback('Path was empty')
        }

    }

    // reading entire users
    readUserData(callback: Function) {
        database().ref('Users/').on('value', function (snapshot: any) {
            callback(snapshot.val())
        })
    }

    /*
    * One On One Chat Stuff 
    * It is happening people
    * I may not understand it later (>.<)'
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
            // console.log(user)
            const dated = moment()
                .utcOffset('+05:30')
                .format(' hh:mm a');

            const DayTime = moment()
                .utcOffset('+05:30')
                .format('DD MMM,YYYY');

            const message = { text, user, gettingTime: dated, createdAt: new Date().getTime(), onDay: DayTime, messageRead: false };
            database().ref('ChatRooms/' + user.idRoom).push(message)

            // for Inbox, loading last messages
            const inboxThisMessage = { text, gettingTime: dated, createdAt: new Date().getTime(), id: user._id, otherId: user.otherID, thisName: user.name, otherName: user.otherPersonName, unreadMessages: 0, otherPersonAvatar: user.otherPersonAvatar}
            const inboxOtherMessage = { text, gettingTime: dated, createdAt: new Date().getTime(), id: user.otherID, otherId: user._id, thisName: user.otherPersonName, otherName: user.name, unreadMessages: 0, otherPersonAvatar: user.otherPersonAvatar}
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
        const onReceive = (data: any) => {
            if (data._snapshot.value) {
                const users = data._snapshot.value;
                const keys = Object.keys(users)
                const messages = [];

                for (let i = 0; i < keys.length; i++) {
                    const a = keys[i]
                    messages.push(users[a])
                }
                messages.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                callback(messages)
            }
        };


        database().ref('Inbox/' + 'OneonOne/').child(uid)
            .on('value', onReceive);
        // .on('value', function (snapshot: any) {
        //     callback(snapshot.val())
        // })
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
    deleteChatThread = (userID: string, chatroomId: string, otherPersonID: string, callBack: Function) => {
        const createdAt = new Date().getTime()
        database().ref('Delete/' + userID + '/' + chatroomId + '/LatestMessage').set(createdAt);
        database().ref('Inbox/' + 'OneonOne/' + userID + '/' + otherPersonID).remove();
        callBack();
    }

    // getting delete node info
    deleteNodeInfo = (userID: string, roomKey: string, callback: Function) => {
        database().ref('Delete/' + userID + '/' + roomKey + '/LatestMessage')
            .on('value', (snapshot: any) => { callback(snapshot.val()) });
    }

    // media message upload
    uploadPic = (uid: string, chatRoomId: string, paths: any, callback: Function, uniqueID: number, mime: string) => {
        console.log('at upload pic', uid, chatRoomId,uniqueID )
        // debugger
        if (!!paths) {
            const ref = storage().ref('messageImages/' + chatRoomId + uid).child(uniqueID.toString());
                return ref
                    .putFile(paths, { contentType: 'jpg' })
                    .then(() => {
                        return ref.getDownloadURL();
                    })
                    .then(url => {
                        console.log('getting storage url', url)
                        callback(url, uniqueID.toString(), mime)
                    })
                    .catch(err => {
                        console.log('error in storage upload picture via messages', err)
                    })
        } else {
            callback(null)
        }
    }

    // Send image message
    sendImageMessage = (
        chatRoomId: string,
        senderId: string,
        senderName: string,
        otherID: string,
        otherName: string,
        avatar: string,
        otherPersonAvatar: string,
        createdAt: number,
        fileURL: string,
        type: string,
        mime: string
    ) => {

        console.log('in send image message')
        const dated = moment()
            .utcOffset('+05:30')
            .format(' hh:mm a');

        const DayTime = moment()
            .utcOffset('+05:30')
            .format('DD MMM,YYYY');

        const text = 'File Attachment'
        if (mime === 'image/jpeg') {
            if (type === 'OneOnOne') {
                const user = {
                    name: senderName,
                    avatar,
                    otherPersonAvatar,
                    idRoom: chatRoomId,
                    _id: senderId,
                    otherID,
                    otherPersonName: otherName
                }

                const message = { user, text, createdAt, gettingTime: dated, onDay: DayTime, image: fileURL };
                console.log('getting the message', message)
                database().ref('ChatRooms/' + chatRoomId).push(message)

                const inboxThisMessage = { text, image: fileURL, gettingTime: dated, createdAt, id: senderId, otherId: otherID, thisName: senderName, otherName, unreadMessages: 0, otherPersonAvatar  }
                const inboxOtherMessage = { text, image: fileURL, gettingTime: dated, createdAt, id: otherID, otherId: senderId, thisName: otherName, otherName: senderName, unreadMessages: 0, otherPersonAvatar  }
                database().ref('Inbox/' + 'OneonOne/' + senderId + '/' + otherID).set(inboxThisMessage)
                database().ref('Inbox/' + 'OneonOne/' + otherID + '/' + senderId).set(inboxOtherMessage)
            } 
            // else if (type === 'Group') {
            //     const user = {
            //         GroupName: chatRoomId,
            //         _id: senderId,
            //         avatar,
            //         name: senderName
            //     }
            //     const message = { text, user, image: fileURL, gettingTime: dated, createdAt: new Date().getTime(), onDay: DayTime, otherName: otherName, otherId: otherID };
            //     firebase.database().ref('SelectedGroupChat/' + chatRoomId).push(message)
            //     firebase.database().ref('Inbox/' + 'GroupChat/' + chatRoomId).set(message)
            // }
        } else if (mime === 'video/mp4') {
            const text = 'Video Attachment'
            if (type === 'OneOnOne') {
                const user = {
                    name: senderName,
                    avatar,
                    idRoom: chatRoomId,
                    _id: senderId,
                    otherID,
                    otherPersonName: otherName,
                    otherPersonAvatar
                }

                const message = { user, text, createdAt, gettingTime: dated, onDay: DayTime, video: fileURL };
                database().ref('ChatRooms/' + chatRoomId).push(message)

                const inboxThisMessage = { text, video: fileURL, gettingTime: dated, createdAt, id: senderId, otherId: otherID, thisName: senderName, otherName,unreadMessages: 0, otherPersonAvatar }
                const inboxOtherMessage = { text, video: fileURL, gettingTime: dated, createdAt, id: otherID, otherId: senderId, thisName: otherName, otherName: senderName, unreadMessages: 0, otherPersonAvatar  }
                database().ref('Inbox/' + 'OneonOne/' + senderId + '/' + otherID).set(inboxThisMessage)
                database().ref('Inbox/' + 'OneonOne/' + otherID + '/' + senderId).set(inboxOtherMessage)
            } 
            // else if (type === 'Group') {
            //     let user = {
            //         GroupName: chatRoomId,
            //         _id: senderId,
            //         avatar: avatar,
            //         name: senderName
            //     }
            //     const message = { text, user, video: fileURL, gettingTime: dated, createdAt: new Date().getTime(), onDay: DayTime, otherName: otherName, otherId: otherID };
            //     firebase.database().ref('SelectedGroupChat/' + chatRoomId).push(message)
            //     firebase.database().ref('Inbox/' + 'GroupChat/' + chatRoomId).set(message)
            // }
        }


    }
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;