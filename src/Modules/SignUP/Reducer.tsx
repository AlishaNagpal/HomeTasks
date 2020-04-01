import * as Actions from '../../Reducer/types'
const initialState = {
    token: '',
    result: {},
    LoginFrom: ''
}

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.UPDATE_TOKEN:
            return { ...state, token: action.payload.data }
        case Actions.GET_RESULT:
            return { ...state, result: action.payload.data }
        case Actions.LoginFrom:
            return { ...state, LoginFrom: action.payload.data }
        default:
            return state
    }
}

export default Reducer;