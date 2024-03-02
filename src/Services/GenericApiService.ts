import {retrieveJWT} from "./LocalStorageService";

const axios = require('axios');

const generateHeaders = () => {
    const JWT = retrieveJWT();
    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${JWT}`
        }
    }
}

export async function post(_module: string, _data: any) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.post(url + _module, _data, generateHeaders());
    return response.data;
}

export async function getAll(_module: string, page=0, size=0) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    let response;
    // check if with or without pagination
    if(size!==0){
        response = await axios.get(url + _module + '?page=' + page + '&size=' + size, generateHeaders());
    } else {
        response = await axios.get(url + _module, generateHeaders());
    }
    return response.data;
}


export async function get(_module: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.get(url + _module, generateHeaders());
    return response.data;
}

export async function patch(_module: string, _data: any) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.patch(url + _module, _data, generateHeaders());
    return response.data;
}

export async function deleteById(_module: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.delete(url + _module, generateHeaders());
    return response.data;
}
