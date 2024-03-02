// @ts-nocheck

import React, {useEffect} from 'react';
import {useStyles} from './Styles';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import {useLocation} from 'react-router-dom'
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {collapse} from "./Actions";
import {expand} from "../Header/Actions"
import {useNavigate} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import {getUserData} from "../../../Services/LocalStorageService";
import {decrypt} from "../../../Services/CryptoService";

// font awesome stuff
const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => Icons[icon])

library.add(...iconList)

const drawerWidth = 240;

interface menuItem {
    title: '',
    url: '',
    icon: ''
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Sider() {
    // Set Theme
    const theme = useTheme();

    // Css for module
    const classes = useStyles();

    // Router object
    const navigate = useNavigate();

    // current location
    const location = useLocation();

    // Redux
    const sider = useSelector(
        (state: RootStateOrAny) => state.sider,
    );

    let userdata = getUserData();

    const header = useSelector(
        (state: RootStateOrAny) => state.header,
    );

    // Dispatcher
    const dispatch = useDispatch()

    // UI vars
    const [open, setOpen] = React.useState(sider.state.isExpanded);


    // Hooks
    useEffect(() => {
        setOpen(sider.state.isExpanded);
    }, [sider]);

    useEffect(() => {
        // setOpen(!header.state.isExpanded)
    }, [header]);


    // UI toggles
    const handleDrawerClose = () => {
        dispatch(collapse()); //sider state collapses
        dispatch(expand()); //header state expands
        // setOpen(false);
    };

    const navigateToComponent = (url) => {
        navigate(url)
    }


    // Menu Items
    const menuItems: any = [
        {
            title: 'Logout',
            url: '/logout',
            icon: 'exclamation-triangle'
        },
        {
            title: 'Users',
            url: '/user',
            icon: 'user-plus'
        },
        // %TEMPLATE_MENU_ITEMS%


    ];

    return (
        <>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>

                    <img className="img-fluid mx-auto px-5"
                         src={require('../../../Assets/img/logo/logo.png')} alt={'Phygrid'}/>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {menuItems.map((item: any, index: any) => (
                        <Tooltip title={item.title} placement="right">
                            <ListItemButton
                                className={location.pathname == item.url ? 'bg-custom-primary-faded' : ''}
                                onClick={() => navigateToComponent(item.url)}
                                key={item.title}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <FontAwesomeIcon icon={item.icon}/>

                                </ListItemIcon>
                                <ListItemText primary={item.title} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default Sider;
