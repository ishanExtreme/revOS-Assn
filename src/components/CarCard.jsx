import React from 'react';

import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import green from '@material-ui/core/colors/green';
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';

import BlackDash from './BlackDash';

const useStyles = makeStyles((theme)=>{
    return {
        cardContainer: {
            padding: theme.spacing(3),
            width: '700px',
            [theme.breakpoints.down('md')]: {
                width: '300px',
            },
            background: '#e0e0e0'
        },
        centerContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: theme.spacing(2)
        },
        headingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            direction: 'row'
        },
        icon: {
            width: theme.spacing(5),
        },
        fontIcon: {
            fontSize: theme.spacing(3),
            marginLeft: theme.spacing(1)
        }

    };
});

const theme = createTheme({

    palette:{
        primary: green,
    }
});


function CarCard({vehicle, live}) {

    const classes = useStyles();

    const CardContent = ({type1, value1, type2, value2})=>{

        return (

            <Grid 
            container
            justifyContent="space-between"
            direction="row"
            >
                <Grid item>
                    <div>
                        <Typography variant="subtitle2">
                            {type1}
                        </Typography>
                        <Typography variant="subtitle1">
                            {value1}
                        </Typography>
                    </div>
                </Grid>
                {type2&&
                <Grid item>
                    <Typography variant="subtitle2">
                    {type2}
                    </Typography>
                    <Typography variant="subtitle1" align="right">
                        {value2?<CheckCircleIcon fontSize="small" color="primary"/>:<CancelIcon fontSize="small" color="error"/>} 
                    </Typography>
                </Grid>
                }

            </Grid>
            

        )
    };

    return (
        <ThemeProvider theme={theme}>
    
            <Paper elevation={3} className={classes.cardContainer}>
                
                {/* Heading  */}
                <div className={classes.headingContainer}>
                    {/* Text */}
                    <Typography variant="h5" align="center" display="inline" style={{fontWeight: 'bold'}}>
                        Vehicle Status
                    </Typography>
                    {/* Live/Disconnect Icon */}
                    {vehicle?
                    live?
                    <Avatar alt="live" src="./icons/live.gif" className={classes.icon}/>
                    :
                    <PortableWifiOffIcon color="error" className={classes.fontIcon}/>
                    :
                    <></>
                    }
                    
                </div>
                <br/>
                <Grid
                container
                direction="row"
                >
                    {/* Text Details */}
                    <Grid item xs={12} lg={5}>
                        <CardContent type1="Elevation" value1="200m" type2="Throttle" value2={true}/>
                        <br/>
                        <CardContent type1="Speed" value1={vehicle?parseInt(vehicle.location.gpsSpeed):"N/A"} type2="Controller" value2={true}/>
                        <br/>
                        <CardContent type1="Locked" value1={vehicle?parseInt(vehicle.ignition.lock)?<CheckCircleIcon fontSize="small" color="primary"/>:<CancelIcon fontSize="small" color="error"/>:"N/A"} type2="Motor" value2={true}/>
                        <br/>
                        <CardContent type1="Battery" value1={vehicle?parseInt(vehicle.battery.batteryVoltageAdc)+"%":"N/A"} type2="Overload" value2={false}/>
                    </Grid>

                    {/* Black Dash */}
                    <Grid item xs={12} lg={7}>
                        <div className={classes.centerContainer}>
                            {vehicle?
                            <BlackDash ignition={parseInt(vehicle.ignition.ignition)} movement={parseInt(vehicle.ignition.movement)} tow={vehicle.alarm.towing?true:false} crash={vehicle.alarm.crashDetection?true:false}/>
                            :
                            <BlackDash noMount={true}/>
                            }
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default CarCard;