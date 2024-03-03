// @ts-nocheck

import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RootStateOrAny, useSelector} from "react-redux";
import {useTranslation, Trans} from 'react-i18next';
import {AuthGuard} from "./Guards/AuthGuard/AuthGuard";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "../index.scss";

// Import components
import Home from "../Components/Screens/Dashboard/Home/Home"
import Error from "../Components/Helpers/Error/Error";
import UserMain from "../Components/Screens/Dashboard/User/UserMain/UserMain";
import {get} from "../Services/GenericApiService";
import {log} from "../Services/LoggerService";
import Login from "../Components/Screens/Authentication/Login/Login";
import Register from "../Components/Screens/Authentication/Register/Register";


function Router() {
    const {t, i18n} = useTranslation();

    // get current language
    const language = useSelector(
        (state: RootStateOrAny) => state.global.global.language,
    );


    // theme configs in redux (if any specific page needs a different theme)
    const [themeColors, setThemeColors] = useState({
        primary: '#2AB762',
        secondary: '#1a1a1a',
        background: '#121212',
        textColor: '#FFFFFF'
    });

    // get current theme
    const theme = useSelector(
        (state: RootStateOrAny) => state.global.global.theme,
    );


    const darkTheme = createTheme({
        typography: {
            fontFamily: 'Michroma, sans-serif',
        },
        palette: {
            mode: theme,
            primary: {
                main: themeColors.primary || '#000000',
                contrastText: "#fff" //button text white instead of black to support dark theme
            },
            background: {
                default: themeColors.background || '#fff'
            },
            text: {
                primary: themeColors.textColor || '#000000',
                secondary: themeColors.textColor || '#000000',
            },
        },
    });

    // Hooks
    useEffect(() => {
        setThemeColors({
            primary: '#2AB762',
            secondary: '#1a1a1a',
            background: theme == 'dark' ? '#121212' : '#FFFFFF',
            textColor: theme == 'dark' ? '#FFFFFF' : '#121212' ,
        })

    }, [theme]);

    useEffect(() => {
        console.log(language);

        if(language){
            // switch language here
            i18n.changeLanguage(language)
        }
    }, [language]);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <BrowserRouter>
                {/*<Header/>*/}
                <Routes>

                    {/* Generic Error */}
                    <Route path="/error" element={<Error/>}/>

                    {/* Non Guarded Routes */}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/logout" element={<Login/>}/>

                    {/* Route Guard */}
                    {/*<Route path="/user" element={<AuthGuard/>}>*/}
                    {/*    <Route path="/user" element={<UserMain/>}/>*/}
                    {/*</Route>*/}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dashboard" element={<Home/>}/>
                    <Route path="/user" element={<UserMain/>}/>
                    <Route path="/report" element={<UserMain/>}/>
                    <Route path="/export" element={<UserMain/>}/>

                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default Router;
