import {EXPAND, COLLAPSE} from "./Types";

const initialState = {
    state: {
        isExpanded: false
    }
}
const HeaderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case EXPAND: return {
            ...state,
            state: {
                isExpanded: true
            }
        }
        case COLLAPSE: return {
            ...state,
            state: {
                isExpanded: false
            }
        }
        default: return state
    }
}
export default HeaderReducer;
