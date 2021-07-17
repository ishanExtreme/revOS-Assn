import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import CarCard from '../components/CarCard';
import StatChart from '../components/StatChart';
import VehicleBreadCrumbs from '../components/VehicleBreadCrumbs';
import VehicleTable from '../components/VehicleTable';
import liveApi from '../api/liveapi';
import rowsApi from '../api/rowapi';
import useApi from '../hooks/useAPI';
import VehicleDrawer from '../components/VehicleDrawer';
import Menu from '@material-ui/icons/Menu';
import Map from '../components/Map';
import Toast from '../components/Toast';
import DistanceTimeModal from '../components/DistanceTimeModal';

const moment = require('moment');

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>{
    return {
        root: {
            display: 'flex'
        },
        appBar: {
            [theme.breakpoints.up('xl')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('xl')]: {
              display: 'none',
            },
        },
        vehicleDetailContainer: {
            
            marginTop: theme.spacing(10)
        },
        statContainer: {
            [theme.breakpoints.down('lg')]: {
                marginTop: theme.spacing(3),
            },
        },
        breadContainer: {
            marginBottom: theme.spacing(5)
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        tableContainer: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1)
        },
        horizontalCenter: {
            display: 'flex',
            justifyContent: 'center'
        },
    };
});

const data = [
    {
        name: "Vehicle 1",
        id: "HR-1"
    },
    {
        name: "Vehicle 2",
        id: "HR-2"
    },
    {
        name: "Vehicle 3",
        id: "HR-3"
    },
    {
        name: "Vehicle 4",
        id: "HR-4"
    },
    {
        name: "Vehicle 5",
        id: "HR-5"
    },
    {
        name: "Vehicle 6",
        id: "HR-6"
    },
    {
        name: "Vehicle 7",
        id: "HR-7"
    },
    {
        name: "Vehicle 8",
        id: "HR-8"
    },
    {
        name: "Vehicle 9",
        id: "HR-9"
    },
    {
        name: "Vehicle 10",
        id: "HR-10"
    }

]

const calculateKMS = (rows)=>{

    const oneUnitDistanceTime = [];
    rows.forEach((row)=>{
        const start = moment(row.startTime);
        const end = moment(row.endTime);
        const timeTakenPerTrip = moment.duration(end.diff(start)).asMinutes();
        // distance in KM
        const distanceCoveredPerTrip = parseFloat(row.distance)/1000;
        oneUnitDistanceTime.push((timeTakenPerTrip/distanceCoveredPerTrip));
    });

    let total = 0.0;
    oneUnitDistanceTime.forEach((time)=>{
        total = total+time;
    });

    return total/(oneUnitDistanceTime.length);
}

function Main(props) {

    const classes = useStyles();

    // array containing not added cars
    const [addArray, setAddArray] = useState(data);
    // array containing added cars
    const [removeArray, setRemoveArray] = useState([]);
    // current vehicle selected
    const [vehicle, setVehicle] = useState(null);
    // for breadcrumbs display
    const [currVehicleName, setCurrVehicleName] = useState(null);
    // is updating live
    const [live, setLive] = useState(true);
    // table rows (10)
    const [rows, setRows] = useState(null);
    // page navigate
    const [page, setPage] = useState(0);
    // loading
    const [loading, setLoading] = useState(false);
    // position for the popover to open
    const [anchorEl, setAnchorEl] = useState(null);
    // opening drawer in small screen
    const [mobileOpen, setMobileOpen] = useState(false);
    // for toogling locate map
    const [mapOpen, setMapOpen] = useState(false);
    // toast message
    const [message, setMessage] = useState('');
    // toogle toast
    const [toastOpen, setToastOpen] = useState(false);
    // Distance modal toogle
    const [openDistanceModal, setOpenDistanceModal] = useState(false);
    // one km distance avg. time
    const [oneUnitTime, setOneUntiTime] = useState(-1);
    


    // apis
    const getVehicleDetails = useApi(liveApi.vehicle_details);
    const getTableRows = useApi(rowsApi.table);

    // call live update API after every 10 seconds
    // and clear handler on unmount
    useEffect(()=> {

        const timer = setInterval(liveUpdate, 10000);

        return ()=>{
            clearInterval(timer);
        }
    });

    // call get rows every time page number changes
    useEffect(()=> {
        console.log("In");
        if(!vehicle) return;
        getRows(vehicle.vin);
    }, [page]);

    // handle battery modal closing
    const handleDistanceModalClose = ()=>{
        setOpenDistanceModal(false);
    };

    // handle battery modal open
    const handleDistanceModalOpen = ()=>{
        if(vehicle)
        {
            setOpenDistanceModal(true);
        }
        else
        {
            setToastMessage("Please select a vehicle!!!");
        }
    }

    // handle map closing
    const handleMapClose = ()=>{
        setMapOpen(false);
    };

    // handle toast close
    const handleToastClose = ()=>{
        setToastOpen(false);
    }

    // handle map open
    const handleMapOpen = ()=>{
        if(vehicle)
            setMapOpen(true);
        else
        {
            setToastMessage("Please select a vehicle!!!");
        }
    };

    // handle toast msg and open
    const setToastMessage = (msg)=>{
        setMessage(msg);
        setToastOpen(true);
    };

    // toogle mobile drawer
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // changes page number
    const handlePageChange = (newPage)=>{
        setPage(newPage);
    };

    // sets anchorEl to NULL
    const handleClose = () => {
        setAnchorEl(null);
    };

    // sets achorEl to the button element position
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // live updating vehicle details card
    const liveUpdate = async ()=>{

        // if no vehicle selected
        if(!vehicle) return;

        const result = await getVehicleDetails.request({token:"1234", vin:vehicle.vin});

        // error
        if(!result.ok)
        {
            console.log("error");
            setLive(false);
            return;
        }

        setVehicle(result.data.data);
        setLive(true);

    };

    // handle select of add vehicle
    const handleSelect = (event, newValue) =>{
        // close popover
        handleClose();
        // add new car
        setRemoveArray((prevValues)=>[newValue, ...prevValues]);
        // remove car from dropdown list
        setAddArray(addArray.filter((car)=>car.name!==newValue.name));
    };

    // handle remove car click
    const handleRemove = (car)=>{

        // add removed car to dropdown
        setAddArray((prevValues)=>[car, ...prevValues]);
        // remove car from display
        setRemoveArray(removeArray.filter((value)=>value.name!==car.name));
        // remove current car data
        setVehicle(null);
        setCurrVehicleName(null);
        setRows(null);
        
    };

    // get rows
    const getRows = async (id, start=false)=>{

        setLoading(true);
        const result = await getTableRows.request({token:"1234", vin:id, first:10, skip:page});
        setLoading(false);
        // error
        if(!result.ok)
        {
            return;
        }

       setRows(result.data.trips);

       if(start)
       {
        setOneUntiTime(calculateKMS(result.data.trips));

       }
    }

    // vehicle select handler
    const handleVehicleSelect = async (car)=>{

        setLoading(true);
        const result = await getVehicleDetails.request({token:"1234", vin:car.id});
        setLoading(false);
        // error
        if(!result.ok)
        {
            console.log("error");
            setLive(false);
            return;
        }

        setVehicle(result.data.data);
        // console.log(result.data);
        setCurrVehicleName(car.name);
        setLive(true);
        // get row data
        // start = true means on selecting a new car first 10 rows is stored
        // seperately for calculating battery information
        getRows(car.id, true);
    }

    return (

        <div className={classes.root}>

            {/* Map Modal */}
            {vehicle&&
                <Map vehicle={vehicle} handleMapClose={handleMapClose} mapOpen={mapOpen}/>
            }

            {/* Distance-Time Modal */}
            <DistanceTimeModal openDistanceModal={openDistanceModal} handleDistanceModalClose={handleDistanceModalClose} oneUnitTime={oneUnitTime}/>

            {/* Toast Message */}
            <Toast openToast={toastOpen} message={message} handleToastClose={handleToastClose}/>

            {/* top navbar */}
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <ToolBar>
                    <IconButton
                    color="secondary"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                    >
                        <Menu />
                    </IconButton>
                    
                    {/* BreadCrumbs */}
                    
                    <VehicleBreadCrumbs name={currVehicleName? currVehicleName:""}/>
                </ToolBar>
            </AppBar>

            {/* Loading Screen */}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            
            {/* Drawer */}
            <VehicleDrawer addArray={addArray} removeArray={removeArray} handleVehicleSelect={handleVehicleSelect} handleRemove={handleRemove} anchorEl={anchorEl} handleClose={handleClose} handleClick={handleClick} handleSelect={handleSelect} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleMapOpen={handleMapOpen} handleDistanceModalOpen={handleDistanceModalOpen}/>

            {/* Vehicle Related Details */}
            <Grid
            container
            className={classes.vehicleDetailContainer}
            
            >
                {/* <Grid item className={classes.breadContainer}>
                    
                </Grid> */}
                {/* Vehicle details and stats */}
                <Grid item xs={12}>
                    <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    >
                        {/* Vehicle Details */}
                        <Grid item lg={12} xl={6}>
                            <div className={classes.horizontalCenter}>
                                <CarCard vehicle={vehicle} live={live}/>
                            </div>
                        </Grid>

                        {/* Stats */}
                        <Grid item lg={12} xl={6} className={classes.statContainer}> 
                            <div className={classes.horizontalCenter}>
                                <StatChart/>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item className={classes.tableContainer}>
                    
                        <VehicleTable rows={rows} handlePageChange={handlePageChange} page={page}/>
                </Grid>
            </Grid>
            
            </div>
    );
};

export default Main;