import React, {useState} from 'react';
import {Chart} from 'react-charts';

import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles((theme)=>{
    return {
        statButtonContainer: {
            display: "flex",
            direction: "row"
        },
        tab: {
            minWidth: 100,
            width: 100,
        },
        tab2: {
            minWidth: 50,
            width: 50,
        },
        statsContainer: {
            width: '700px'
        }
    };
});

function StatChart(props) {

    const classes = useStyles();

    // type of stats
    const [type, setType] = useState(0);
    // time type
    const [time, setTime] = useState(0);

    // tab change for type
    const handleChangeType = (event, newValue)=>{
        setType(newValue);
    }

    // tab change for time type
    const handleChangeTime = (event, newValue)=>{
        setTime(newValue);
    }

    const data = React.useMemo(
        () => [
          {
            label: 'Example',
            data: [[0, 20], [1, 10], [1.5, 5], [2, 10], [3, 20], [4, 5], [6, 30], [7, 50], [7.5, 20]]
          },

        ],
        []
    )
     
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )


    return (
        <>

            <Grid
            container
            direction="row"
            className={classes.statsContainer}
            justifyContent="space-between"
            >
                <Grid item>
                    
                    <div className={classes.statButtonContainer}>
                        {/* Heading  */}
                        <Typography variant="h5" display="inline" style={{marginRight: '10px', fontWeight: 'bold'}}>
                            Statistics
                        </Typography>
                        {/* Type Tabs */}
                        <Tabs
                        value={type}
                        onChange={handleChangeType}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        >   
                            <Tab label="Bookings" classes={{root: classes.tab}}/>
                            <Tab label="Earnings" classes={{root: classes.tab}}/>
                        </Tabs>
                        
                    </div>
                </Grid>

                <Grid item>
                    {/* Time type tabs */}
                    <Tabs
                    value={time}
                    onChange={handleChangeTime}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >   
                        <Tab label="D" classes={{root: classes.tab2}}/>
                        <Tab label="W" classes={{root: classes.tab2}}/>
                        <Tab label="M" classes={{root: classes.tab2}}/>
                        <Tab label="Y" classes={{root: classes.tab2}}/>
                    </Tabs>

                </Grid>
            </Grid>
            <br/>
            <div
            style={{
                width: '700px',
                height: '300px'
            }}
            >
            <Chart data={data} axes={axes}/>
            </div>
        </>
    );
};

export default StatChart;