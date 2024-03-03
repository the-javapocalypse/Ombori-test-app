// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography, {TypographyProps} from '@mui/material/Typography';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {switchTheme} from "../../../../../../Global/Actions";
import '../../../../../index.scss';

function TextDisplay({label = '', data = '', background = 'dark', isLoading = false}) {


    // Redux
    const theme = useSelector(
        (state: RootStateOrAny) => state.global.global.theme,
    );


    return (
        <div className={'card shadow-lg mb-4 bg-' + background}>
            <div className={'alert m-0 p-0 py-2 px-3'}>
                <h6 className={''}>
                    {label}
                </h6>
                <Typography
                    variant="h4"
                    className={'fw-bolder '}>
                    {isLoading ? <Skeleton sx={{bgcolor: '#848884'}}/> : data}
                </Typography>
            </div>
        </div>
    );

}

export default TextDisplay;
