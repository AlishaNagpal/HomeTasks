import * as Actions from '../../Reducer/types'
const initialState = {
    profileData: {},
}

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.ProfileData:
            return { ...state, profileData: action.payload.data }
        default:
            return state
    }
}

export default Reducer;