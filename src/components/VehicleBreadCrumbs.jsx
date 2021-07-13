import React from 'react';

import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';

import BreadCrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>{
    return {
    };
});

const theme = createTheme({
});

function VehicleBreadCrumbs({name}) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <BreadCrumbs seperator=">">
                <Link color="inherit">
                    Vehicles
                </Link>

                <Typography color="textPrimary">{name}</Typography>
            </BreadCrumbs>
        </ThemeProvider>
    );
};

export default VehicleBreadCrumbs;