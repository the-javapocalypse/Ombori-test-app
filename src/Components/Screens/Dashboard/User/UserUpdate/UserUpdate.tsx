import React, {useRef} from 'react';
import {useStyles} from './Styles';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {patch, post} from "../../../../../Services/GenericApiService";
import {useTranslation} from "react-i18next";
import UserForm from "../UserForm/UserForm";
import {log} from "../../../../../Services/LoggerService";
import { encrypt } from '../../../../../Services/CryptoService';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {Button} from "@mui/material";
import AlertM from '../../../../Helpers/AlertM/AlertM';


// @ts-ignore
function UserUpdate({refreshDataEvent, recordToUpdate, resetEditState}) {
    // css for module
    const classes = useStyles();

    // module(s) for api
    const moduleMain = 'user';

    // translation
    const { t } = useTranslation();

    // child ref for alert
    const notifications = useRef();

    // ui handlers
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = React.useState(false);


    // handle edit record event
    const handleEditEvent = (_formData: any) => {
        setLoading(true); // show loader

        if(_formData.password) {
            _formData.password = encrypt(_formData.password)
        } else {
            delete _formData.password;
        }

        patch(moduleMain, _formData)
            .then(async (_res) => {
                setLoading(false); // hide loader
                refreshDataEvent(); // refresh data
                handleClose();
                // @ts-ignore
                notifications.current.alert(t('common.createSuccess'), '', 'success');
                resetEdit();
            })
            .catch(_err => {
                console.log('here');
                log(_err)
                setLoading(false); // hide loader
                // @ts-ignore
                notifications.current.alert(t('common.somethingWentWrong'), t('common.tryAgain'), 'error');
                resetEdit();
            })
    }

    // handle cancel event
    const handleCancelEvent = () => {
        handleClose();
        resetEdit();
    }


    // reset isEdit to false in main component
    const resetEdit = () => {
        resetEditState(true);
    }


    return (
        <div>
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
                        <UserForm handleCancelEvent={handleCancelEvent}
                                      handleAddEvent={() => {}}
                                      isEditMode={true}
                                      handleEditEvent={handleEditEvent}
                                      recordToUpdate={recordToUpdate}
                                      isLoading={loading}/>
                    </Box>
                </Fade>
            </Modal>


           {/* Alerts */}
            <AlertM ref={notifications}/>

        </div>
    );
}

export default UserUpdate;
