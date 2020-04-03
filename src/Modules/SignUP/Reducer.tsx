import * as Actions from '../../Reducer/types'
const initialState = {
    token: '',
    result: {},
    LoginFrom: '',
    userUID: '',
}

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.UPDATE_TOKEN:
            return { ...state, token: action.payload.data }
        case Actions.GET_RESULT:
            return { ...state, result: action.payload.data }
        case Actions.LoginFrom:
            return { ...state, LoginFrom: action.payload.data }
        case Actions.FIREBASE_UID:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default Reducer;