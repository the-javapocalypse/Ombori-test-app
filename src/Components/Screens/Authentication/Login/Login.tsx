// @ts-nocheck
import React, { useRef } from 'react';
import { Button, Card, CardContent, TextField, Typography, Box, FormControl, Divider } from "@mui/material";
import { Typewriter, useTypewriter, Cursor } from 'react-simple-typewriter'
import { useStyles } from './Styles';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../../index.scss';
import { useTranslation, Trans } from 'react-i18next';
import { useForm } from "react-hook-form";
import { post } from "../../../../Services/GenericApiService";
import AlertM from "../../../Helpers/AlertM/AlertM";
import { encrypt } from "../../../../Services/CryptoService";
import { getUserData, storeJWT } from "../../../../Services/LocalStorageService";
import { login } from "./Actions";
import { InputAdornment, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';

// font awesome stuff
const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => Icons[icon])

library.add(...iconList)



const Fade = require("react-reveal/Fade")
const Reveal = require("react-reveal/Reveal")


function Login() {
    // styles
    const classes = useStyles();

    // router
    const navigate = useNavigate();

    // translation
    const { t } = useTranslation();

    // child ref for alert
    const notifications = useRef();

    // module(s) for api
    const moduleMain = 'user/auth/email';

    // state in redux
    const authentication = useSelector(
        (state: RootStateOrAny) => state.authentication,
    );

    // Dispatcher
    const dispatch = useDispatch()

    // form data
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm(); // watch is used to get the value e.g watch("name")

    // data vars
    const [showPassword, setShowPassword] = React.useState(false);

    // ui controls
    const [loading, setLoading] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // authentication methods
    const onLogin = (_data: any) => {
        setLoading(true); // show loader

        // for demo purpose, for actual usage, we will need to uncomment the code below
        navigate('/dashboard');

        // encrypt data
        // _data.password = encrypt(_data.password)

        // post(moduleMain, _data)
        //     .then(_res => {
        //         setLoading(false); // hide loader
        //         storeJWT(_res.token)
        //         const userdata = getUserData();
        //         dispatch(login(true, _res.token, userdata));
        //         navigate('/dashboard');
        //     })
        //     .catch(_err => {
        //         setLoading(false); // hide loader
        //         // @ts-ignore
        //         notifications.current.errorAlert(t('login.loginFailed'), t('login.invalidCredentials'));
        //     })
    }

    return (
        <section className="full-width h-100">
            <div className="row h-100 p-0 m-0">
                {/* Spacer */}
                <div className="col-md-1 col-0"></div>
                {/* Hero Div */}
                <div className="col-md-4 px-md-5 px-2">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="px-md-0 px-4">

                            <div className="col-md-12 mt-5 mx-md-2 mx-0">
                                <h2>{t('module.login')}</h2>
                                <p>{t('login.tagline')}</p>
                            </div>

                            <form className="row px-2" onSubmit={handleSubmit(onLogin)}>

                                {/* Field Email */}
                                <div className="col-md-12 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="emailInput"
                                                   {...register("email", { required: true })}
                                                   label={t('login.email')}
                                                   type={"email"}
                                                   error={!!errors.email}
                                                   variant="outlined"
                                                   className="full-width" />
                                    </FormControl>
                                </div>

                                {/* Field Password */}
                                <div className="col-md-12 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="passwordInput"
                                                   {...register("password", { required: true })}
                                                   label={t('login.password')}
                                                   type={showPassword ? "text" : "password"}
                                                   error={!!errors.password}
                                                   variant="outlined"
                                                   className="full-width"
                                                   InputProps={{ // <-- This is where the toggle button is added.
                                                       endAdornment: (
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                               >
                                                                   {showPassword ? <FontAwesomeIcon width={'1em'} icon='eye' className={'text-custom-primary'} /> : <FontAwesomeIcon width={'1em'} icon='eye-slash' className={'text-custom-primary'} />}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       )
                                                   }} />
                                    </FormControl>
                                </div>

                                {/* Submit Button */}
                                <div className="col-md-12 mt-4">
                                    <Button type="submit"
                                            variant="contained"
                                            className={'bg-custom-gradient my-2 py-3 full-width'}>
                                        {t('module.login')}
                                    </Button>
                                </div>

                            </form>


                            <Divider className={'my-2 my-md-4'}>Or continue with</Divider>


                            <div className="col-md-12 my-5">
                                <p className="my-2 mx-md-2 mx-0 text-center">
                                    {t('login.dontHaveAccount')}&nbsp;
                                    <span className="fw-bolder text-theme-dark pointer" onClick={() => navigate('/register')}>
                                        {t('module.register')}
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Spacer */}
                <div className="col-md-1 col-0"></div>

                {/* Hero Div */}
                <div className="col-md-6 col-12 order-first order-md-last">
                    <div className="">
                        {/* Laptop Div */}
                        <Card sx={{m: 3, minHeight: '95vh', boxShadow: 10}} className={'d-md-block d-none shadow-lg'}>
                            <div className="d-flex align-items-center justify-content-center bg-custom-animated "
                                 style={{minHeight: '95vh'}}>
                                <img className="img-fluid mx-auto" style={{width: '15vw'}}
                                     src={require('../../../../Assets/img/logo/logo.png')}/>
                            </div>
                        </Card>

                        {/* Phone Div */}
                        <Card sx={{m: 3, minHeight: '30vh', boxShadow: 10}} className={'bg-custom-gradient d-md-none d-block shadow-lg'}>
                            <div className="d-flex align-items-center justify-content-center bg-custom-animated"
                                 style={{minHeight: '30vh'}}>
                                <img className="img-fluid mx-auto"
                                     src={require('../../../../Assets/img/logo/logo.png')}/>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>


            <AlertM ref={notifications} />

        </section>
    );
}


export default Login;
