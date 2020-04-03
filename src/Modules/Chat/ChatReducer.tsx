import * as Actions from '../../Reducer/types';
import Data from '../../Containers/Chat/Data';

const initialState = {
    value: Data,
    userUID: '',
};

const ChatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.CHAT_DATA:
            return { ...state, value: action.payload.data };
        case Actions.DELETE_CHAT_DATA:
            return { ...state, value: action.payload.data };
        case Actions.FIREBASE_UID:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};

export default ChatReducer;
