import React from 'react';

import { makeStyles} from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AutoComplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';

import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import ExtraOptions from './ExtraOptions';

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>{
    return {
        drawer: {
            [theme.breakpoints.up('xl')]: {
              width: drawerWidth,
              flexShrink: 0,
            },
          },
        drawerPaper: {
            background: '#e0e0e0',
            width: drawerWidth,
            display: 'flex',
            direction: 'column',
            justifyContent: 'space-between'
        },
        btn: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1.5),
            background: '#424242'
        },
        cardContainer: {
            display: 'flex',
            direction: 'row',
            justifyContent: 'space-between',
            marginTop: theme.spacing(3),
            padding: theme.spacing(1)
        },
        drawerContentsContainer: {
            padding: theme.spacing(3),
        }

    };
});

function VehicleDrawer({addArray, removeArray, handleVehicleSelect, handleRemove, anchorEl, handleClose, handleClick, handleSelect, mobileOpen, handleDrawerToggle, handleMapOpen, handleBatteryModalOpen}) {

    const classes = useStyles();


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
    };


    // toggling popover
    const open = Boolean(anchorEl);

    return (

        // Left Side Menu 
        <nav className={classes.drawer}>
        {/* Mobile Version Drawer */}
        {/* Note-> ***Repetition of drawer content on purpose*** */}
        <Hidden xlUp>
            <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper,
            }}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            >
                <div className={classes.drawerContentsContainer}>
                        {/* Heading */}
                        <Typography variant="h5" align="center" style={{fontWeight: 'bold', marginBottom: '15px'}}>
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
                            style={{width: 200}}
                            renderInput={(params)=> <TextField {...params} label="Search..." variant="filled"/>}
                            />
                        </Popover>

                        {/* Added Car(s) */}
                        {removeArray.map((value)=>{
                            return (
                                <PaperCard car={value} key={value.id}/>
                            );
                        })}
                    </div>

                <ExtraOptions handleMapOpen={handleMapOpen}/>

            </Drawer>
        </Hidden>
        {/* Desktop Version Drawer */}
        {/* Note-> ***Repetition of drawer content on purpose*** */}
        <Hidden lgDown>
            <Drawer
                anchor="left"
                open
                variant="permanent"
                elevation={0}
                classes={{paper: classes.drawerPaper}}
                >
                    <div className={classes.drawerContentsContainer}>
                        {/* Heading */}
                        <Typography variant="h5" align="center" style={{fontWeight: 'bold', marginBottom: '15px'}}>
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
                            style={{width: 200}}
                            renderInput={(params)=> <TextField {...params} label="Search..." variant="filled"/>}
                            />
                        </Popover>

                        {/* Added Car(s) */}
                        {removeArray.map((value)=>{
                            return (
                                <PaperCard car={value} key={value.id}/>
                            );
                        })}
                    </div>

                    <ExtraOptions handleMapOpen={handleMapOpen} handleBatteryModalOpen={handleBatteryModalOpen}/>


            </Drawer>
        </Hidden>
        </nav>
            
    );
};

export default VehicleDrawer;