// @ts-nocheck

import {useStyles} from './Styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import React, {useState, useEffect, useRef} from 'react';
import {useTranslation} from "react-i18next";
import {List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress} from '@material-ui/core';
import {get} from '../../../../../Services/GenericApiService';
import AlertM from '../../../../Helpers/AlertM/AlertM';

import {RootStateOrAny, useDispatch, useSelector} from "react-redux";


import Header from "../../../../Layout/Header/Header";
import Sider from "../../../../Layout/Sider/Sider";
import {log} from "../../../../../Services/LoggerService";


const UserMain = () => {
    // translation
    const {t} = useTranslation();

    // child ref for alert
    const notifications = useRef();

    // Redux ------------------------------------->
    const theme = useSelector(
        (state: RootStateOrAny) => state.global.global.theme,
    );

    // module(s) for api ------------------------------------->
    const moduleMain = 'users';

    // data vars ------------------------------------->
    const [users, setUsers] = useState([]);

    // ui vars ------------------------------------->
    const [loading, setLoading] = useState(true);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    // hooks ------------------------------------->
    useEffect(() => {
        const fetchUsers = async () => {
            setLazyLoading(true);
            try {
                const response = await get(moduleMain + `?page=${page}`);
                setUsers(prevUsers => [...prevUsers, ...response.data]);
                setMaxPage(response.total_pages);
                setLoading(false);
                setLazyLoading(false);
            } catch (_err) {
                log(_err);
                notifications.current.alert(t('common.somethingWentWrong'), t('common.tryAgain'), 'error');
                setLoading(false);
                setLazyLoading(false);
            }
        };

        fetchUsers();
    }, [page]);


    // ui handlers ------------------------------------->
    const handleScroll = (event) => {
        const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            if (page < maxPage) {
                setPage(prevPage => prevPage + 1);
            } else {
                notifications.current.alert(t('user.lazyLoadCompleted'), '', 'success');
            }
        }
    };

    return (

        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            <Header/>

            <Sider/>


            <Box component="main" sx={{flexGrow: 2, p: 3}} mt={10}>
                {/* Upper Section */}
                <div className="row">
                    <div className="col-md-10">
                        <h2 className="mt-3">
                            {t('module.user')}
                        </h2>
                    </div>
                    <div className="col-md-2">
                        {/*  CTA Buttons  */}
                    </div>
                </div>


                <div className={`h-40 card shadow-lg scrollY ${theme === 'dark' ? 'bg-dark' : ''}`} onScroll={handleScroll}>
                    <List>
                        {users.map(user => (
                            <ListItem key={user.id}>
                                <ListItemAvatar>
                                    <Avatar alt={`${user.first_name} ${user.last_name}`} src={user.avatar}/>
                                </ListItemAvatar>
                                <ListItemText disableTypography={true} primary={`${user.first_name} ${user.last_name}`} />
                            </ListItem>
                        ))}
                    </List>
                    {lazyLoading && <CircularProgress style={{display: 'block', margin: 'auto'}}/>}
                </div>

                {/* Alerts */}
                <AlertM ref={notifications}/>

            </Box>
        </Box>
    );
};

export default UserMain;
