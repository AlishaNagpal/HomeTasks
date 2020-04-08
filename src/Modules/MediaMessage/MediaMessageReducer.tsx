import * as Actions from '../../Reducer/types';

interface UploadType {
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
}

const initialState = {
    renderFooter: {},
    mediaMessage: new Array<UploadType>(),
    lengthArray: 0,
};

 const MediaMessagesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.MEDIA_MESSAGE:
            return { ...state, mediaMessage: action.payload.data }
        case Actions.RENDER_FOOTER:
            return { ...state, renderFooter: action.payload.data }
        case Actions.ARRAY_LENGHT:
            return { ...state, lengthArray: action.payload.data }
        default:
            return state
    }
}

export default MediaMessagesReducer;
