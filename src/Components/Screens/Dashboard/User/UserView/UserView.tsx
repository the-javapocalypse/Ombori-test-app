// @ts-nocheck

import React, {useEffect} from 'react';
import {useStyles} from './Styles';
import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip";
import {Button, Card, CardContent, IconButton} from "@mui/material";
import {useTranslation} from "react-i18next";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CardActions from "@mui/material/CardActions";
import DataDisplayM from "../../../../Helpers/DataDisplayM/DataDisplayM";
import {log} from "../../../../../Services/LoggerService";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';


function UserView({data = null}) {
    // css for module
    const classes = useStyles();

    // translation
    const {t} = useTranslation();

    // ui handlers
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // handle cancel event
    const handleCancelEvent = () => {
        handleClose();
    }

    // hooks
    useEffect(() => {

    }, []);


    return (
        <>
                <Tooltip title={t('common.view')}>
                    <IconButton aria-label="view" size="small" onClick={handleOpen}>
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>

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
                        <Card sx={{width: '75vw', maxHeight: '90vh', overflowY: 'auto'}}>
                            <CardContent>
                                <div className="py-4 px-md-4 px-0">
                                    <h1 className="mb-3">{t('common.recordDetails')}</h1>
                                    <div className="row full-width">


                                        <div className="col-md-4 mt-4">
                                            <img className={'img-fluid rounded'}
                                                alt={'Avatar'}
                                                src={data.avatar}

                                            />
                                        </div>

                                        <div className="col-md-4">
                                            {data &&
                                           <DataDisplayM label={t('user.firstName')} data={data.first_name} />
                                            }                                        </div>



                                        <div className="col-md-4">
                                            {data &&
                                           <DataDisplayM label={t('user.lastName')} data={data.last_name} />
                                            }                                        </div>


                                        <div className="col-md-4">
                                            {data &&
                                           <DataDisplayM label={t('user.email')} data={data.email} />
                                            }                                        </div>


                                        <div className="col-md-4">
                                            {data &&
                                           <DataDisplayM label={t('user.contact')} data={data.contact} />
                                            }                                        </div>

                                    </div>
                                </div>
                            </CardContent>
                            <CardActions>
                                <div className="pb-4 pt-2 px-md-4 px-2 " style={{width: '100%', textAlign: 'right'}}>

                                    {/* Cancel Button */}
                                    <Button variant="outlined"
                                            onClick={handleCancelEvent}>
                                        {t('common.cancel')}
                                    </Button>

                                    &nbsp;&nbsp;
                                </div>
                            </CardActions>
                        </Card>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default UserView;
