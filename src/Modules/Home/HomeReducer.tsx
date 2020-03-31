import * as Actions from '../../Reducer/types';
const initialState = {
  value: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.HOME_DATA:
      return {...state, value: action.payload.data};
    default:
      return state;
  }
};

export default Reducer;
