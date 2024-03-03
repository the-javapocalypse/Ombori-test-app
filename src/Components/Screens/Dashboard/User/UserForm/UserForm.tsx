import React, { useEffect } from 'react';
import { useStyles } from './Styles';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Header from "../../../../Layout/Header/Header";
import Sider from "../../../../Layout/Sider/Sider";
import { post, getAll } from "../../../../../Services/GenericApiService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { log } from "../../../../../Services/LoggerService";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import { Button, FormControl, TextField, FormControlLabel, Checkbox, FormHelperText, InputAdornment, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from '@mui/lab';
import FileUploadM from "../../../../Helpers/FileUploadM/FileUploadM";


// @ts-ignore
function UserForm({ handleAddEvent, handleCancelEvent, isLoading, isEditMode, recordToUpdate, handleEditEvent }) {
    // css for module
    const classes = useStyles();

    // router object
    const navigate = useNavigate();

    // module(s) for api
    const moduleMain = 'user';
    const moduleRoles = 'role';

    // linked components API modules (endpoints)


    // translation
    const { t } = useTranslation();

    // UI methods
    const [loading, setLoading] = React.useState(true);

    // form data
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm(); // watch is used to get the value e.g watch("name")

    // form methods
    const onSubmit = (_data: any) => {
        if (!isEditMode) {
            handleAddEvent(_data);
        } else {
            handleEditEvent(_data);
        }
    }

    // data vars
    const [isCheckedIsactive, setIsCheckedIsactive] = React.useState(false);
    const [allRoles, setAllRoles] = React.useState([]);
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // ui handlers
    const onCancel = () => {
        handleCancelEvent();
    }

    // fetch dependent data



    const fetch = () => {
        fetchRoles();
    }

    // fetch dependent data
    const fetchRoles = () => {
        getAll(moduleRoles)
            .then((_res: any) => {
                // set all data
                setAllRoles(_res)
                setLoading(false); // hide loader
            })
            .catch(_err => {
                log(_err)
                setLoading(false); // hide loader
            })
    }



    // hooks
    useEffect(() => {
        fetch();
        if (isEditMode) {
            reset(recordToUpdate);

            setIsCheckedIsactive(recordToUpdate.isActive);

        }
    }, []);


    return (
        <Box sx={{ display: 'flex' }}>
            <Card sx={{ width: '75vw', maxHeight: '90vh', overflowY: 'auto' }}>
                {/* Form start */}
                <form className="row px-1 px-md-0" onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="py-2 px-md-4 px-2">
                            <div className="row">

                                <div className="col-md-12 my-2">
                                    {/* Form name */}
                                    <h3 className="pb-2">
                                        {isEditMode ? t('common.edit') : t('common.add')} {t('module.user')}
                                    </h3>

                                </div>



                                {/* Field firstName */}
                                <div className="col-md-6 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="firstNameInput"
                                            {...register("first_name", { required: true })}
                                            label={t('user.firstName')}
                                            type={"text"}
                                            error={!!errors.firstName}
                                            variant="outlined"
                                            className="full-width" />
                                    </FormControl>
                                </div>


                                {/* Field lastName */}
                                <div className="col-md-6 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="lastNameInput"
                                            {...register("last_name", { required: true })}
                                            label={t('user.lastName')}
                                            type={"text"}
                                            error={!!errors.lastName}
                                            variant="outlined"
                                            className="full-width" />
                                    </FormControl>
                                </div>

                                {/* Field email */}
                                <div className="col-md-6 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="emailInput"
                                            {...register("email", { required: true })}
                                            label={t('user.email')}
                                            type={"text"}
                                            error={!!errors.email}
                                            variant="outlined"
                                            className="full-width" />
                                    </FormControl>
                                </div>

                                {/* Field contact */}
                                <div className="col-md-6 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="contactInput"
                                            {...register("contact", { required: true })}
                                            label={t('user.contact')}
                                            type={"text"}
                                            error={!!errors.contact}
                                            variant="outlined"
                                            className="full-width" />
                                    </FormControl>
                                </div>


                                {/* Field password */}
                                <div className="col-md-6 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="passwordInput"
                                            {...register("password", { required: !isEditMode })}
                                            label={t('user.password')}
                                            type={showPassword ? "text" : "password"}
                                            error={!!errors.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={togglePasswordVisibility}
                                                            edge="end"
                                                        >
                                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="outlined"
                                            className="full-width" />
                                    </FormControl>
                                </div>

                            </div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="pb-4 pt-2 px-md-4 px-2 " style={{ width: '100%', textAlign: 'right' }}>

                            {/* Cancel Button */}
                            <Button variant="outlined"
                                onClick={onCancel}>
                                {t('common.cancel')}
                            </Button>

                            &nbsp;&nbsp;

                            {/* Okay Button */}
                            <LoadingButton loading={isLoading}
                                type="submit"
                                variant="contained"
                                className="bg-custom-gradient">
                                {isEditMode ? t('common.edit') : t('common.add')}
                            </LoadingButton>
                            &nbsp;
                        </div>
                    </CardActions>
                </form>
            </Card>
        </Box>
    );
}

export default UserForm;
