import {EXPAND, COLLAPSE} from "./Types";

export const expand = () => {
    return {
        type: EXPAND
    }
}

export const collapse = () => {
    return {
        type: COLLAPSE
    }
}
