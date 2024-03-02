import {SWITCH_LANGUAGE} from "./Types";
import {SWITCH_THEME} from "./Types";
import {SET_FORM_DATA} from "./Types";

const initialState = {
    global: {
        language: 'en',
        theme: 'dark'
    }
}

const GlobalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SWITCH_LANGUAGE: return {
            ...state,
            global: {
                language: action.language
            }
        }
        case SWITCH_THEME: return {
            ...state,
            global: {
                theme: action.theme
            }
        }
         case SET_FORM_DATA: return {
            ...state,
            global: {
                formData: action.formData
            }
        }
        default: return state
    }
}

export default GlobalReducer
