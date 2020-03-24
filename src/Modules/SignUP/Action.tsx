import * as Actions from '../../Reducer/types'

export const updateToken = (value: string) => {
    return (dispatch: any) => {
        dispatch({ type: Actions.UPDATE_TOKEN, payload: { data: value } });
    }
}

export const getResult = (
    email: string,
    name: string,
    profilePic: string,
    callback: Function,
  ) => {
    return (dispatch: any) => {
      let temp = {
        email: email,
        name: name,
        profilePic: profilePic,
      };
      dispatch({type: Actions.GET_RESULT, payload: {data: temp}});
      callback();
    };
  };