// @ts-nocheck
import * as React from 'react';
import {Button, IconButton} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {library} from '@fortawesome/fontawesome-svg-core';
import {useTranslation} from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";

// font awesome stuff
const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => Icons[icon])

library.add(...iconList)

function ConfirmationDialog({title, body, type, isLoading, confirmEvent, dataItemIdx}) {
    // dialog state
    const [open, setOpen] = React.useState(false);

    // translation
    const {t} = useTranslation();

    // to configure different ui and text for buttons
    const typeOfConfirmation = {
        'delete': {
            'actionBtnText': t('common.delete'),
            'color': 'error'
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        confirmEvent(dataItemIdx);
        handleClose();
    };

    return (
        <div className={'d-inline-block pl-1'}>
            <IconButton aria-label="delete" size="small" onClick={handleClickOpen}>
                <FontAwesomeIcon className="delete-btn" icon='trash'/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="mx-md-2 my-2">
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        &nbsp;&nbsp;
                        <LoadingButton loading={isLoading}
                                       onClick={handleConfirm}
                                       variant="contained"
                                       color={typeOfConfirmation[type].color}>
                            {typeOfConfirmation[type].actionBtnText}
                        </LoadingButton>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmationDialog;
