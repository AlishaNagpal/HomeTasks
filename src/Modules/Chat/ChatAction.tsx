import * as Actions from '../../Reducer/types';

export const getChatDATA = () => {
    return (dispatch: any, getState: any) => {
        const { value } = getState().ChatReducer;
        let emptyArray = value;
        emptyArray = emptyArray.slice();
        dispatch({ type: Actions.CHAT_DATA, payload: { data: emptyArray } });
    }
};

export const deleteChatDATA = (newValue: number) => {
    return (dispatch: any, getState: any) => {
        const { value } = getState().ChatReducer;
        let emptyArray = value;
        const indexToFind = emptyArray.findIndex((item: any) => item.id === newValue) 
        emptyArray.splice(indexToFind,1);
        dispatch({ type: Actions.DELETE_CHAT_DATA, payload: { data: emptyArray } });
    }
};
