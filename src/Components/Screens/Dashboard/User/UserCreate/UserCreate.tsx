import React, {useRef} from 'react';
import {useStyles} from './Styles';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {post} from "../../../../../Services/GenericApiService";
import {useTranslation} from "react-i18next";
import UserForm from "../UserForm/UserForm";
import {log} from "../../../../../Services/LoggerService";
import { encrypt } from '../../../../../Services/CryptoService';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AlertM from '../../../../Helpers/AlertM/AlertM';
import {Button} from "@mui/material";

// @ts-ignore
function UserCreate({refreshDataEvent}) {
    // css for module
    const classes = useStyles();

    // is there any file uploading involved
    const isFileUploading = 0;

    // module(s) for api
    const moduleMain = 'user';

    // translation
    const { t } = useTranslation();

    // Redux
    const uploadedFiles = useSelector(
        (state: RootStateOrAny) => state.global.global.formData,
    );

    // child ref for alert
    const notifications = useRef();

    // ui handlers
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = React.useState(false);


    const uploadFiles = (_id: any) => {
        // create a new formdata object because createFormData doesnt works apparently
        var bodyFormData = new FormData();

        Object.keys(uploadedFiles).forEach(_key => {
            bodyFormData.append('file', uploadedFiles[_key], uploadedFiles[_key].name);
        })

        post(moduleMain + '/upload/' + moduleMain + '/' + _id, bodyFormData)
            .then(_res => {
                setLoading(false); // hide loader
                refreshDataEvent(); // refresh data
                handleClose();
                // @ts-ignore
                notifications.current.successAlert(t('common.createSuccess'), '');
            })
            .catch(_err => {
                log(_err)
                setLoading(false); // hide loader
                // @ts-ignore
                notifications.current.errorAlert(t('common.somethingWentWrong'), t('common.tryAgain'));
            })
    }



    // handle add record event
    const handleAddEvent = (_formData: any) => {
        setLoading(true); // show loader
        if(_formData.password) {
            _formData.password = encrypt(_formData.password);
        }
        post(moduleMain, _formData)
            .then(_res => {
                // add condition here
                if(isFileUploading) {
                    uploadFiles(_res.id)
                } else {
                    setLoading(false); // hide loader
                    refreshDataEvent(); // refresh data
                    handleClose();
                    // @ts-ignore
                    notifications.current.alert(t('common.createSuccess'), '', 'success');
                }
            })
            .catch(_err => {
                log(_err)
                setLoading(false); // hide loader
                // @ts-ignore
                notifications.current.alert(t('common.somethingWentWrong'), t('common.tryAgain'), 'error');
            })
    }

    // handle cancel event
    const handleCancelEvent = () => {
        handleClose();
    }


    return (
        <div>
            <Button
                variant="contained"
                onClick={handleOpen}
                className={'bg-custom-gradient my-2 py-3'}
                fullWidth>
                {t('common.add')}
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                onBackdropClick={handleCancelEvent}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.modal}>
                        <UserForm handleAddEvent={handleAddEvent}
                                      isEditMode={false}
                                      handleEditEvent={() => {}}
                                      handleCancelEvent={handleCancelEvent}
                                      recordToUpdate={null}
                                      isLoading={loading}/>
                    </Box>
                </Fade>
            </Modal>


            {/* Alerts */}
            <AlertM ref={notifications}/>

        </div>
    );
}

export default UserCreate;
