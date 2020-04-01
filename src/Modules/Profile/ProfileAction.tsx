import * as Actions from '../../Reducer/types'

export const ProfileDataOverHere = (
  bio: string,
  phoneNumber: string
) => {
  return (dispatch: any) => {
    let temp = {
      bio,
      phoneNumber
    };
    dispatch({ type: Actions.ProfileData, payload: { data: temp } });
  };
};