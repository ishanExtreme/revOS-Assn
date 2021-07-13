import React from 'react';

import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme)=>{
    return {
        cardContainer: {
            padding: theme.spacing(3),
            width: '250px',
            background: '#e0e0e0'
        }

    };
});

const theme = createTheme({

    palette:{
        primary: green,
    }
});


function CarCard(props) {

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
                <Typography variant="h5" align="center">
                    Vehicle Status
                </Typography>
                <br/>
                <CardContent type1="Elevation" value1="200m" type2="Throttle" value2={true}/>
                <br/>
                <CardContent type1="Temperature" value1="45C" type2="Controller" value2={false}/>
                <br/>
                <CardContent type1="Locked" value1={<CheckCircleIcon fontSize="small" color="primary"/>}/>
                <br/>
                <CardContent type1="Battery" value1="75.6%"/>

            </Paper>
        </ThemeProvider>
    );
};

export default CarCard;