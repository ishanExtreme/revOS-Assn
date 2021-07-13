import React, {useEffect, useState} from 'react';

import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import CarCard from '../components/CarCard';
import StatChart from '../components/StatChart';
import VehicleBreadCrumbs from '../components/VehicleBreadCrumbs';
import VehicleTable from '../components/VehicleTable';
import liveApi from '../api/liveapi';
import rowsApi from '../api/rowapi';
import useApi from '../hooks/useAPI';

const useStyles = makeStyles((theme)=>{
    return {
        drawerPaper: {
            padding: theme.spacing(3),
            background: '#e0e0e0',
            width: '240px',
        },
        btn: {
            marginTop: theme.spacing(3),
            background: '#424242'
        },
        cardContainer: {
            display: 'flex',
            direction: 'row',
            justifyContent: 'space-between',
            marginTop: theme.spacing(3),
            padding: theme.spacing(1)
        },
        drawer: {
            width: '240px',
            flexShrink: 0,
        },
        vehicleDetailContainer: {
            marginLeft: '340px'
        },
        breadContainer: {
            marginBottom: theme.spacing(5)
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        tableContainer: {
            marginTop: theme.spacing(3)
        }
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

function Main(props) {

    const classes = useStyles();

    // array containing not added cars
    const [addArray, setAddArray] = useState(data);
    // array containing added cars
    const [removeArray, setRemoveArray] = useState([]);
    // position for the popover to open
    const [anchorEl, setAnchorEl] = useState(null);
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

    // changes page number
    const handlePageChange = (newPage)=>{
        setPage(newPage);
    }

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

    // sets achorEl to the button element position
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    // sets anchorEl to NULL
    const handleClose = () => {
        setAnchorEl(null);
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
    const getRows = async (id)=>{

        setLoading(true);
        const result = await getTableRows.request({token:"1234", vin:id, first:10, skip:page});
        setLoading(false);
        // error
        if(!result.ok)
        {
            return;
        }

       setRows(result.data.trips);
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
        getRows(car.id);
    }
    
    // toggling popover
    const open = Boolean(anchorEl);

    const PaperCard = ({car})=>{

        return (
            // Card Body
            <Paper
            className={classes.cardContainer}
            >
                {/* Vehicle name */}
                <Typography variant="subtitle2"
                onClick={()=>handleVehicleSelect(car)}
                style={{cursor:"pointer"}}
                >
                    {car.name}
                </Typography>
                {/* Remove Vehicle option */}
                <CancelIcon 
                onClick={()=>handleRemove(car)}
                style={{cursor:"pointer"}}
                size="small"/>
            </Paper>
        );
    }

    return (
        <>
    
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <div style={{display: 'flex'}}>
            {/* Left Side Menu */}
            {/* <nav className={classes.drawer}> */}
                <Drawer
                anchor="left"
                open={true}
                variant="permanent"
                elevation={0}
                classes={{paper: classes.drawerPaper}}
                >
                    {/* Heading */}
                    <Typography variant="h4" align="center" style={{fontWeight: 'bold', marginBottom: '15px'}}>
                        Vehicle Viewer
                    </Typography>
                    {/* Add Button */}
                    <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClick}
                    className={classes.btn}>
                        Add vehicle
                    </Button>
                    {/* Add vehicle select popover */}
                    <Popover 
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    >
                        <AutoComplete 
                        options={addArray}
                        onChange={handleSelect}
                        getOptionLabel={(option)=>option.name}
                        style={{width: 250}}
                        renderInput={(params)=> <TextField {...params} label="Search..." variant="filled"/>}
                        />
                    </Popover>

                    {/* Added Car(s) */}
                    {removeArray.map((value)=>{
                        return (
                            <PaperCard car={value} key={value.id}/>
                        );
                    })}

                </Drawer>
            {/* </nav> */}
        
            {/* Vehicle Related Details */}
            <Grid
            container
            className={classes.vehicleDetailContainer}
            
            >
                <Grid item className={classes.breadContainer}>
                    {/* BreadCrumbs */}
                    <VehicleBreadCrumbs name={currVehicleName? currVehicleName:""}/>
                </Grid>
                {/* Vehicle details and stats */}
                <Grid item xs={12}>
                    <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    >
                        {/* Vehicle Details */}
                        <Grid item>
                            <CarCard vehicle={vehicle} live={live}/>
                        </Grid>

                        {/* Stats */}
                        <Grid item>
                            <StatChart/>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item className={classes.tableContainer}>
                    <VehicleTable rows={rows} handlePageChange={handlePageChange} page={page}/>
                </Grid>
            </Grid>
            </div>
        </>
    );
};

export default Main;