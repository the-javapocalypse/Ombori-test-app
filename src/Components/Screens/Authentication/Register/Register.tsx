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
        post(module, _data)
            .then(_res => {
                setLoading(false); // hide loader
                setOpenSuccessAlert(true);  // show success alert
            })
            .catch(_err => {
                log(_err);
                setLoading(false); // hide loader
                setOpenErrorAlert(true);  // show error alert
            })
    }


    return (
        <section className="full-width h-100">
            <div className="row h-100">

                {/* Content Div */}
                <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="px-md-0 px-4">
                            <h2>{t('module.register')}</h2>
                            <p>{t('register.tagline')}</p>
                            <form className="row px-2" onSubmit={handleSubmit(onSubmit)}>
                                <TextField id="emailInput"
                                           {...register("email", {required: true})}
                                           label={t('form.email')}
                                           type={"email"}
                                           error={!!errors.email}
                                           variant="outlined"
                                           className="full-width my-2"/>
                                <TextField id="passwordInput"
                                           {...register("password", {required: true})}
                                           label={t('form.password')}
                                           type={"password"}
                                           error={!!errors.password}
                                           variant="outlined"
                                           className="full-width my-2"/>
                                <LoadingButton loading={loading}
                                               type="submit"
                                               variant="contained"
                                               className="my-2 py-3 bg-custom-gradient">
                                    {t('module.register')}
                                </LoadingButton>
                            </form>
                            <p className="my-2">
                                {t('register.haveAccount')}&nbsp;
                                <span className="fw-bolder text-theme-dark" onClick={() => navigate('/login')}>
                                    {t('module.login')}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hero Div */}
                <div className="col-md-6">
                    <div className="">
                        <Card sx={{m: 3, minHeight: '95vh', boxShadow: 10}} className="bg-custom-gradient">
                            <CardContent>

                            </CardContent>
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
