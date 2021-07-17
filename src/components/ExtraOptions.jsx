import React from 'react';

import { makeStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import NotListedLocationOutlinedIcon from '@material-ui/icons/NotListedLocationOutlined';
import TimerIcon from '@material-ui/icons/Timer';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

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

function ExtraOptions({handleMapOpen, handleDistanceModalOpen}) {

    const classes = useStyles();

    return (
        
            <Paper className={classes.optionContainer} elevation={3}>

                <Tooltip title="Trace Back">
                    <IconButton
                    color="secondary"
                    // onClick={handleDistanceModalOpen}
                    >
                        <MapOutlinedIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Locate">
                    <IconButton
                    color="secondary"
                    onClick={handleMapOpen}
                    >
                        <NotListedLocationOutlinedIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Get Time">
                    <IconButton
                    color="secondary"
                    onClick={handleDistanceModalOpen}
                    >
                        <TimerIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>

            </Paper>
        
    );
};

export default ExtraOptions;