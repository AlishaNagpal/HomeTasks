import * as Actions from '../../Reducer/types'

export const updateToken = (value: string) => {
    return (dispatch: any) => {
        dispatch({ type: Actions.UPDATE_TOKEN, payload: { data: value } });
    }
}

export const getResult = (result: any) => {
    return (dispatch: any) => {
        dispatch({ type: Actions.GET_RESULT, payload: { data: result } });
    }
}