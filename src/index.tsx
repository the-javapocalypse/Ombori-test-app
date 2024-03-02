import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./Routes/Router";
import SmoothScroll from "./Components/Helpers/SmoothScroll/SmoothScroll";
import {Provider} from 'react-redux';
import store from "./Redux/Store";
import './Locale/i18n';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { GoogleOAuthProvider } from '@react-oauth/google';


// Logging control
if(process.env.REACT_APP_WARNINGS_LOGGING == 'false'){
    console.warn = () => {};
}

if(process.env.REACT_APP_ERRORS_LOGGING == 'false'){
    console.error = () => {};
}

ReactDOM.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_SSO_CLIENT_ID || ''}>
    <React.StrictMode>
        {/*<SmoothScroll/>*/}
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router></Router>
            </LocalizationProvider>
        </Provider>
    </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
