// @ts-nocheck
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    modal: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
    }
});

export { useStyles }
