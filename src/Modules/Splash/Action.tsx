import * as Actions from '../../Reducer/types'

export const splashToken = (value: boolean) => {
    return (dispatch: any) => {
        dispatch({ type: Actions.GET_SPLASH, payload: { data: value } });
    }
}
