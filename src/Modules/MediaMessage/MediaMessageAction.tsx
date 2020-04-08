import * as Actions from '../../Reducer/types';

// cause message be replacing the last inbox message
export const MediaMessageAction = (
    chatRoomId: string,
    senderId: string,
    senderName: string,
    otherID: string,
    otherName: string,
    avatar: string,
    otherAvatar: string,
    createdAt: number,
    fileType: string,
    fileName: string,
    fileURL: string,
    uniqueID: string,
) => {
    return (dispatch: any, getState: any) => {
        // debugger
        console.log('over here in action')
        const { mediaMessage } = getState().MediaMessagesReducer;
        const emptyArray: any = {}
        const array = mediaMessage
        emptyArray.chatRoomId = chatRoomId
        emptyArray.senderId = senderId
        emptyArray.senderName = senderName
        emptyArray.otherID = otherID
        emptyArray.otherName = otherName
        emptyArray.avatar = avatar
        emptyArray.otherAvatar = otherAvatar
        emptyArray.createdAt = createdAt
        emptyArray.fileType = fileType
        emptyArray.fileName = fileName
        emptyArray.fileURL = fileURL
        emptyArray.uniqueID = uniqueID
        array.push(emptyArray)
        dispatch({ type: Actions.MEDIA_MESSAGE, payload: { data: array } });
        console.log('bottom of the action')
    }
}

export const forFooter = (value: boolean, type: string) => {
    return (dispatch: any) => {
        const temp = {
            value,
            type
        }
        dispatch({ type: Actions.RENDER_FOOTER, payload: { data: temp } });
    }
}


export const ArrayLenght = (value: number) => {
    return (dispatch: any) => {
        dispatch({ type: Actions.ARRAY_LENGHT, payload: { data: value } });
    }
}

export const RemoveTask = (uniqueID: string) => {
    return (dispatch: any, getState: any) => {
        const { mediaMessage } = getState().MediaMessagesReducer;
        const array = mediaMessage
        const index = array.findIndex((item: any) => item.uniqueID === uniqueID)
        if (index !== -1) {
            array.splice(index, 1)
        }
        dispatch({ type: Actions.MEDIA_MESSAGE, payload: { data: array } });
    }
}