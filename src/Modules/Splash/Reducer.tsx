import * as Actions from '../../Reducer/types'
const initialState = {
    splashRan: false,
}

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.GET_SPLASH:
            return { ...state, splashRan: action.payload.data }
        default:
            return state
    }
}

export default Reducer;