import React from 'react';

import { makeStyles } from '@material-ui/core';

import BreadCrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>{
    return {
    };
});

function VehicleBreadCrumbs({name}) {

    const classes = useStyles();

    return (
        
        <BreadCrumbs separator=">">
            <Link color="inherit">
                Vehicles
            </Link>

            <Typography color="textPrimary">{name}</Typography>
        </BreadCrumbs>
        
    );
};

export default VehicleBreadCrumbs;