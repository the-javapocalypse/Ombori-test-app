import {LOGIN} from "./Types";

const initialState = {
    user: {
        id: null,
        email: null,
        token: null,
        isAuthenticated: false
    }
}

const AuthenticationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN: return {
            ...state,
            user: {
                id: action.payload.id,
                email: action.payload.email,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated
            }
        }
        default: return state
    }
}

export default AuthenticationReducer
