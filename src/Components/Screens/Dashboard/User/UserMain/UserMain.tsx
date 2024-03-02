import React from 'react';
import {useStyles} from './Styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import {RootStateOrAny, useDispatch, useSelector} from "react-redux";


import Header from "../../../../Layout/Header/Header";
import Sider from "../../../../Layout/Sider/Sider";


const UserMain = () => {
    const classes = useStyles();

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            <Header />

            <Sider />


            <Box component="main" sx={{flexGrow: 2, p: 3}} mt={10}>
                   <h2>Usera asdasd</h2>
            </Box>
        </Box>
    );
};

export default UserMain;
