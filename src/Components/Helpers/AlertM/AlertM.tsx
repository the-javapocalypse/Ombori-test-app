import React, { forwardRef, useImperativeHandle } from 'react';
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AlertColor } from '@mui/material/Alert';

// @ts-ignore
const AlertM = forwardRef((props, ref) => {

    // translation
    const { t } = useTranslation();

    // ui controls
    const [openAlert, setOpenAlert] = React.useState(false);

    // data vars
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');
    const [type, setType] = React.useState<AlertColor | undefined>('success'); // Explicitly typed

    // expose alert method
    useImperativeHandle(ref, () => ({
        alert(_title = '', _body = '', _type: AlertColor | undefined = 'success') { // Ensure _type parameter type
            // set title
            setTitle(_title === '' ? t('common.success') : _title);

            // set body
            setBody(_body);

            // set type
            setType(_type);

            // display alert
            setOpenAlert(true);
        }
    }));

    // ui handlers
    const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <div>
            {/* Alerts */}
            <div>
                <Snackbar open={openAlert}
                          autoHideDuration={6000}
                          onClose={handleCloseAlert}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity={type} onClose={handleCloseAlert} sx={{ width: '100%' }}>
                        <AlertTitle>{title}</AlertTitle>
                        {body}
                    </Alert>
                </Snackbar>
            </div>

        </div>
    );
});

export default AlertM;
