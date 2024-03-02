import {COLLAPSE, EXPAND} from "./Types";

const initialState = {
    state: {
        isExpanded: true
    }
}

const SiderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case COLLAPSE: return {
            ...state,
            state: {
                isExpanded: false
            }
        }
        case EXPAND: return {
            ...state,
            state: {
                isExpanded: true
            }
        }
        default: return state
    }
}

export default SiderReducer;
