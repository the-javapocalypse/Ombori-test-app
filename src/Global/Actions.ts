import {SWITCH_LANGUAGE} from "./Types";
import {SWITCH_THEME} from "./Types";
import {SET_FORM_DATA} from "./Types";

export const switchLanguage = (_lang: string) => {
    return {
        type: SWITCH_LANGUAGE,
        language: _lang
    }
}

export const switchTheme = (_theme: string) => {
    return {
        type: SWITCH_THEME,
        theme: _theme
    }
}

export const setFormData = (formData: any) => {
    return {
        type: SET_FORM_DATA,
        formData: formData
    }
}