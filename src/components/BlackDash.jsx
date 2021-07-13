import React from 'react';

import { makeStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>{
    return {
        dashContainer: {
            background: 'black',
            padding: theme.spacing(3),
            width: '250px'
        },
        icon: {
            width: theme.spacing(5)
        }
    };
});

function BlackDash({ignition, movement, tow, crash, noMount}) {

    const classes = useStyles();

    return (
        <Paper className={classes.dashContainer} elevation={4}>
            {noMount?
            <Typography align="center" color="secondary">No Vehicle Selected</Typography>
            :
            <Grid
            container
            direction="column"
            spacing={5}
            >
                {/* First Row */}
                <Grid item>
                    <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    >
                        {/* Ignition */}
                        <Grid item>
                            {ignition?
                            <Avatar className={classes.icon} variant="square" alt="ignition-on" src="./icons/ignition-on.png"/>
                            :
                            <Avatar className={classes.icon} variant="square" alt="ignition-off" src="./icons/ignition-off.png"/>
                            }
                        </Grid>

                        {/* Movement */}
                        <Grid item>
                            {movement?
                            <Avatar className={classes.icon} variant="square" alt="moving" src="./icons/car-moving.png"/>
                            :
                            <Avatar className={classes.icon} variant="square" alt="stop" src="./icons/car-stop.png"/>
                            }
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Row */}
                <Grid item>
                    <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    >
                        {/* towing */}
                        <Grid item>
                            {tow?
                            <Avatar className={classes.icon} variant="square" alt="tow-on" src="./icons/tow-on.png"/>
                            :
                            <Avatar className={classes.icon} variant="square" alt="tow-off" src="./icons/tow-off.png"/>
                            }
                        </Grid>

                        {/* crash */}
                        <Grid item>
                            {crash?
                            <Avatar className={classes.icon} variant="square" alt="crash-on" src="./icons/crash-on.png"/>
                            :
                            <Avatar className={classes.icon} variant="square" alt="crash-off" src="./icons/crash-off.png"/>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
            }
        </Paper>
    );
};

export default BlackDash;