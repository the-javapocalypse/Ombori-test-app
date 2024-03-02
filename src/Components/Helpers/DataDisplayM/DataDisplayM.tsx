import React from 'react';
import {Typography} from "@mui/material";
import {formatData} from '../../../Services/DataFormatService';


// @ts-ignore
function DataDisplayM({label, data}) {

    return (
        <div className="my-3">
            <Typography variant="subtitle1" component="div" className="text-muted">
                {label}
            </Typography>
            <Typography variant="body1" component="div" className="">
                {formatData([data])[0]}
            </Typography>
        </div>
    );
}

export default DataDisplayM;
