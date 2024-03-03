// @ts-nocheck
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {getMenuItems} from "../../../Services/MenuItems";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {To, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

// font awesome stuff
const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => Icons[icon])

library.add(...iconList)


export default function BottomAppBar() {
    // translation
    const {t} = useTranslation();

    // get menu items
    const menuItems = getMenuItems(t);

    // Router object
    const navigate = useNavigate();

    const navigateToComponent = (url: To) => {
        navigate(url)
    }

    return (
        <React.Fragment>
            <AppBar position="fixed" className={'bg-custom-gradient'} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    {menuItems.map((_item, _index) => <React.Fragment key={_index}>
                        <IconButton color="inherit" aria-label="open drawer" onClick={()=>{navigateToComponent(_item.url)}}>
                            <FontAwesomeIcon icon={_item.icon} />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                    </React.Fragment>)
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
