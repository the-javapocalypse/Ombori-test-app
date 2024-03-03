import React from 'react';
import {Button, Card, CardContent, TextField, Typography, Box, Snackbar, Alert, AlertTitle} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {Typewriter, useTypewriter, Cursor} from 'react-simple-typewriter'
import {useStyles} from './Styles';
import {RootStateOrAny, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {post} from '../../../../Services/GenericApiService';
import {useForm} from "react-hook-form";
import '../../../../index.scss';
import { useTranslation, Trans } from 'react-i18next';
import {log} from '../../../../Services/LoggerService';

function Register() {
    const classes = useStyles();
    const navigate = useNavigate();
    const module = 'user';
    const { t } = useTranslation();

    // form data
    const {register, handleSubmit, watch, formState: {errors}} = useForm(); // watch is used to get the value e.g watch("name")

    // ui controls
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };

    const onSubmit = (_data: any) => {
        setLoading(true); // show loader

        // for demo purpose, for actual usage, we will need to uncomment the code below
        setOpenSuccessAlert(true);  // show success alert
        setLoading(false); // hide loader

        // post(module, _data)
        //     .then(_res => {
        //         setLoading(false); // hide loader
        //         setOpenSuccessAlert(true);  // show success alert
        //     })
        //     .catch(_err => {
        //         log(_err);
        //         setLoading(false); // hide loader
        //         setOpenErrorAlert(true);  // show error alert
        //     })
    }


    return (
        <section className=" h-100">
            <div className="row h-100 p-0 m-0">

                {/* Spacer */}
                <div className="col-md-1 col-0"></div>
                {/* Content Div */}
                <div className="col-md-4 col-12 px-md-5">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="px-md-0 px-4">
                            <h2>{t('module.register')}</h2>
                            <p>{t('register.tagline')}</p>
                            <form className="row px-2" onSubmit={handleSubmit(onSubmit)}>
                                <TextField id="emailInput"
                                           {...register("email", {required: true})}
                                           label={t('register.email')}
                                           type={"email"}
                                           error={!!errors.email}
                                           variant="outlined"
                                           className="full-width mt-4"/>
                                <TextField id="passwordInput"
                                           {...register("password", {required: true})}
                                           label={t('register.password')}
                                           type={"password"}
                                           error={!!errors.password}
                                           variant="outlined"
                                           className="full-width mt-4"/>
                                <LoadingButton loading={loading}
                                               type="submit"
                                               variant="contained"
                                               className="mb-2 mt-4 py-3 bg-custom-gradient">
                                    {t('module.register')}
                                </LoadingButton>
                            </form>
                            <p className="my-5 text-center">
                                {t('register.haveAccount')}&nbsp;
                                <span className="fw-bolder text-theme-dark pointer" onClick={() => navigate('/login')}>
                                    {t('module.login')}
                                </span>
                            </p>
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

            {/* Success Alert */}
            <Snackbar open={openSuccessAlert}
                      autoHideDuration={6000}
                      onClose={handleCloseAlert}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%' }}>
                    <AlertTitle>{t('register.createSuccess')}</AlertTitle>
                    {t('register.creationMailSent')}
                </Alert>
            </Snackbar>

            {/* Error Alert */}
            <Snackbar open={openErrorAlert}
                      autoHideDuration={6000}
                      onClose={handleCloseAlert}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity="error" onClose={handleCloseAlert} sx={{ width: '100%' }}>
                    <AlertTitle>{t('common.somethingWentWrong')}</AlertTitle>
                    {t('common.tryAgain')}
                </Alert>
            </Snackbar>
        </section>
    );
}


export default Register;
