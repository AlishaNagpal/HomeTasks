import * as Actions from '../../Reducer/types'
const initialState = {
    token: '',
    result: [],
}

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.UPDATE_TOKEN:
            return { ...state, token: action.payload.data }
        case Actions.GET_RESULT:
            return { ...state, result: action.payload.data }
        default:
            return state
    }
}

export default Reducer;