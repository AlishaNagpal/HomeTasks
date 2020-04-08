import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import { vh, VectorIcons, Colors, vw } from '../Constants';
import { TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import { MediaMessageAction, forFooter, RemoveTask } from '../Modules/MediaMessage/MediaMessageAction';
import { useDispatch, useSelector } from 'react-redux';
import FirebaseServices from '../Components/Firebase';
import ActionSheet from 'react-native-action-sheet';

export interface Props {
    reRenderMessages: Function,
    type: string,
}

const BUTTONSiOS = [
    'Send a Photo',
    'Send a Video',
    'Cancel'
];

const BUTTONSandroid = [
    'Send a Photo',
    'Send a Video'
];
const CANCEL_INDEX = 3;

export default function InputToolbarClass(props: Props) {
    const dispatch = useDispatch();

    const { mediaMessage } = useSelector((state: { MediaMessagesReducer: any }) => ({
        mediaMessage: state.MediaMessagesReducer.mediaMessage,
    }));

    const onImageUpload = () => {
        console.log('in image upload')
        ImagePicker.openPicker({
            multiple: true,
            compressImageQuality: 0.6
        }).then(image => {
            console.log('in input toolbar', image, props)
            const { user } = props

            for (let i = 0; i < image.length; i++) {
                const createdAt = new Date().getTime()
                const random = ((Math.random() + createdAt) * createdAt) / Math.random()
                // debugger
                dispatch(MediaMessageAction(
                    user.idRoom || user.GroupName,
                    user._id,
                    user.name,
                    user.otherID || user.GroupName,
                    user.otherPersonName || user.GroupName,
                    user.avatar,
                    user.otherPersonAvatar,
                    new Date().getTime(),
                    'image',
                    image[i].filename,
                    image[i].path,
                    random.toString()
                ))
                dispatch(forFooter(true, 'image/jpeg'))
                props.reRenderMessages && props.reRenderMessages()
                FirebaseServices.uploadPic(mediaMessage[i].senderId, mediaMessage[i].chatRoomId, mediaMessage[i].fileURL, getStorageURL, random, 'image/jpeg')
                // S3Handler.uploadImageToS3(mediaMessage[i].fileURL, mediaMessage[i].fileName, this.getStorageURL, this.errorCallBack, random.toString(), 'image/jpeg')
            }
        });
    };

    // const errorCallBack = (error: any) => {
    //     console.log('error', error)
    // }

    const getStorageURL = (url: string, uniqueID: string, mime: string) => {
        console.log(' in getStorage URL')
        const num = mediaMessage.findIndex((item: any) => uniqueID === item.uniqueID)
        FirebaseServices.sendImageMessage(
            mediaMessage[num].chatRoomId,
            mediaMessage[num].senderId,
            mediaMessage[num].senderName,
            mediaMessage[num].otherID,
            mediaMessage[num].otherName,
            mediaMessage[num].avatar,
            mediaMessage[num].otherAvatar,
            mediaMessage[num].createdAt,
            url,
            props.type,
            mime
        )
        dispatch(RemoveTask(uniqueID))
        props.reRenderMessages()
        dispatch(forFooter(false, 'none'))
    }

    const onVideoUpload = () => {
        // @ts-ignore
        ImagePicker.openPicker({
            mediaType: 'video',
            compressVideoPreset: 'Passthrough'
        }).then((video) => {
            // console.log('onVideoUpload', video);
            const { user } = props

            const createdAt = new Date().getTime()
            const random = ((Math.random() + createdAt) * createdAt) / Math.random()
            dispatch(MediaMessageAction(
                user.idRoom || user.GroupName,
                user._id,
                user.name,
                user.otherID || user.GroupName,
                user.otherPersonName || user.GroupName,
                user.avatar,
                user.otherPersonAvatar,
                new Date().getTime(),
                'image',
                video.filename,
                video.path,
                random.toString(),
            ))
            dispatch(forFooter(true, 'video/mp4' ))
            props.reRenderMessages && props.reRenderMessages()
            const i = mediaMessage.length - 1
            FirebaseServices.uploadPic(mediaMessage[i].senderId, mediaMessage[i].chatRoomId, mediaMessage[i].fileURL, getStorageURL, random, 'video/mp4')
            // S3Handler.uploadImageToS3(mediaMessage[i].fileURL, mediaMessage[i].fileName, this.getStorageURL, this.errorCallBack, random.toString(), 'video/mp4')
        });
    }

    const showActionSheet = () => {
        ActionSheet.showActionSheetWithOptions({
            options: (Platform.OS === 'ios') ? BUTTONSiOS : BUTTONSandroid,
            cancelButtonIndex: CANCEL_INDEX,
            tintColor: 'blue'
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        onImageUpload()
                        break;
                    case 1:
                        onVideoUpload()
                        break;
                    default:
                        break;
                }
            });
    }

    const renderAccesory = () => {
        return (
            <TouchableOpacity style={styles.main} activeOpacity={1} onPress={showActionSheet} >
                <VectorIcons.Ionicons name="ios-add-circle-outline" color={Colors.socialColor} size={vw(30)} />
            </TouchableOpacity>
        )
    }

    return (
        <InputToolbar
            {...props}
            renderActions={renderAccesory}
            containerStyle={{
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                paddingRight: vh(7.5),
                alignItems: 'center',
                justifyContent: 'center',
                // height: vh(55),
            }}
            primaryStyle={{ alignItems: 'center' }}
        />
    )
}
