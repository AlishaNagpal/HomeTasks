import * as Actions from '../../Reducer/types';
const initialState = {
  value: 0,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.HOME_VALUE:
      return {...state, value: action.payload.data};
    default:
      return state;
  }
};

export default Reducer;
