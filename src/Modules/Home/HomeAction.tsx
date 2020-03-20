import * as Actions from '../../Reducer/types';

export const updateValueHome = (value: number) => {
  return (dispatch: any) => {
    dispatch({type: Actions.HOME_VALUE, payload: {data: value}});
  };
};
