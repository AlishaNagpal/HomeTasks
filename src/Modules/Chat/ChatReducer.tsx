import * as Actions from '../../Reducer/types';
import Data from '../../Containers/Chat/Data';

const initialState = {
    value: Data
};

const ChatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.CHAT_DATA:
            return { ...state, value: action.payload.data };
        case Actions.DELETE_CHAT_DATA:
            return { ...state, value: action.payload.data };
        default:
            return state;
    }
};

export default ChatReducer;
