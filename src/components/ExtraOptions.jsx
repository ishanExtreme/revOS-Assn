import React from 'react';

import { makeStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import BatteryUnknownIcon from '@material-ui/icons/BatteryUnknown';

const useStyles = makeStyles((theme)=>{
    return {
        optionContainer: {
            display: 'flex',
            justifyContent: 'center',
            background: 'black',
            padding: theme.spacing(1),
            margin: theme.spacing(1)
        }
    };
});

function ExtraOptions({handleMapOpen, handleBatteryModalOpen}) {

    const classes = useStyles();

    return (
        
            <Paper className={classes.optionContainer} elevation={3}>
                <Tooltip title="Locate">
                    <IconButton
                    color="secondary"
                    onClick={handleMapOpen}
                    >
                        <NotListedLocationIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Battery Info">
                    <IconButton
                    color="secondary"
                    onClick={handleBatteryModalOpen}
                    >
                        <BatteryUnknownIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>

            </Paper>
        
    );
};

export default ExtraOptions;