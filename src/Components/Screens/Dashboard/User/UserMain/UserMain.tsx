// @ts-nocheck

import {useStyles} from './Styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React, {useState, useEffect, useRef} from 'react';
import {useTranslation} from "react-i18next";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    CircularProgress,
    ListItemSecondaryAction
} from '@material-ui/core';
import {deleteById, get} from '../../../../../Services/GenericApiService';
import AlertM from '../../../../Helpers/AlertM/AlertM';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {RootStateOrAny, useSelector} from "react-redux";


import Header from "../../../../Layout/Header/Header";
import Sider from "../../../../Layout/Sider/Sider";
import {log} from "../../../../../Services/LoggerService";
import UserCreate from "../UserCreate/UserCreate";
import UserUpdate from "../UserUpdate/UserUpdate";
import UserView from "../UserView/UserView";
import ConfirmationDialog from "../../../../Helpers/ConfirmationDialog/ConfirmationDialog";
import TextDisplay from "../../Chart/TextDisplay/TextDisplay";


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
    const [analytics, setAnalytics] = useState({total: 0, active: 0, inactive: 0});
    const [dataToEdit, setDataToEdit] = React.useState({});


    // ui vars ------------------------------------->
    const [loading, setLoading] = useState(true);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [editMode, setEditMode] = React.useState(false);

    // API ------------------------------------------>
    const fetch = () => {
        fetchUsers();
    }

    const fetchUsers = async () => {
        setLazyLoading(true);
        try {
            const response = await get(moduleMain + `?page=${page}`);
            setAnalytics(prevState => ({
                ...prevState,
                total: response.total
            }));
            setUsers(prevUsers => [...prevUsers, ...response.data]);
            setMaxPage(response.total_pages);
            setLazyLoading(false);
        } catch (_err) {
            log(_err);
            notifications.current.alert(t('common.somethingWentWrong'), t('common.tryAgain'), 'error');
            setLazyLoading(false);
        }
    };

    const handleDelete = (_dataItemId: number) => {
        setLoading(true);   // show spinner

        deleteById(moduleMain, _dataItemId)
            .then(async (_res) => {
                setLoading(false);  // hide loader
                // @ts-ignore
                notifications.current.alert(t('common.deleteSuccess'), '', 'success');
                fetch();    // refresh data
            })
            .catch(_err => {
                log(_err)
                // @ts-ignore
                notifications.current.alert(t('common.somethingWentWrong'), t('common.tryAgain'), 'error');
                setLoading(false); // hide loader
            })
    }


    // hooks ------------------------------------->
    useEffect(() => {
        fetch();
    }, [page]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, []);


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

    // event handlers
    const onEditClick = (_data: any) => {
        setDataToEdit(_data);
        setEditMode(true);
    }

    const resetEdit = (_state) => {
        setEditMode(false);
    }

    return (

        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            <Header/>

            <Sider/>


            <Box component="main" sx={{flexGrow: 2, p: 3}} mt={{xs: 2, md: 10}}>
                {!loading &&
                    <>
                        {/* Upper Section */}
                        <div className="row mb-5">
                            <div className="col-md-10 col-8">
                                <h2 className="mt-3 fw-bolder">
                                    {t('module.user')}
                                </h2>
                            </div>
                            <div className="col-md-2 col-4">
                                <UserCreate refreshDataEvent={fetch}/>
                            </div>
                        </div>


                        <div className="row">
                            {/* Analytics */}
                            <div className="col-md-6">
                                <div className={'mb-3'}>
                                    <h4>{t('common.overview')}</h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextDisplay label={t('user.total')} data={analytics?.total || 0} isLoading={loading} background={'custom-primary'} />
                                    </div>

                                    <div className="col-md-6">
                                        <TextDisplay label={t('user.active')} data={parseInt(analytics?.total)/2 || 0} isLoading={loading} background={'custom-primary'} />
                                    </div>

                                    <div className="col-md-6">
                                        <TextDisplay label={t('user.inactive')} data={parseInt(analytics?.total)/2 || 0} isLoading={loading} background={'custom-primary'} />
                                    </div>
                                </div>

                            </div>

                            {/* List */}
                            <div className="col-md-6 mt-md-0">
                                <div className={'mb-3'}>
                                    <h4>{t('user.userList')}</h4>
                                </div>
                                <div style={{overflowY: "scroll"}}
                                     className={`h-30 card shadow-lg ${theme === 'dark' ? 'bg-dark' : ''}`}
                                     onScroll={handleScroll}>
                                    <List>
                                        {users.map(user => (
                                            <ListItem key={user.id}>
                                                <ListItemAvatar>
                                                    <Avatar alt={`${user.first_name} ${user.last_name}`} src={user.avatar}/>
                                                </ListItemAvatar>
                                                <ListItemText disableTypography={true}
                                                              primary={`${user.first_name} ${user.last_name}`}/>
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="delete" size="small" onClick={() => {
                                                        onEditClick(user)
                                                    }}>
                                                        <EditIcon/>
                                                    </IconButton>

                                                    <UserView data={user}/>

                                                    {/*  delete confirmation dialog  */}
                                                    <ConfirmationDialog title={'Delete Confirmation'}
                                                                        body={'Are you sure you want to delete this record?'}
                                                                        type={'delete'}
                                                                        isLoading={loading}
                                                                        dataItemIdx={user.id}
                                                                        confirmEvent={handleDelete}/>

                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                    {lazyLoading && <CircularProgress style={{display: 'block', margin: 'auto'}}/>}
                                </div>
                            </div>
                        </div>
                    </>
                }

                {loading &&
                    <div className="d-flex justify-content-center align-items-center h-90 w-100">
                        <img className="img-fluid mx-auto px-5" src={require('../../../../../Assets/gif/pulse.gif')}
                             alt={'Phygrid'}/>
                    </div>
                }

                {/* Alerts */}
                <AlertM ref={notifications}/>

                {/* display edit modal */}
                {editMode &&
                    <div>
                        <UserUpdate refreshDataEvent={fetch}
                                    resetEditState={resetEdit}
                                    recordToUpdate={dataToEdit}/>
                    </div>
                }

            </Box>
        </Box>
    );
};

export default UserMain;
