import React, {useState} from 'react';

import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';

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
            padding: theme.spacing(3),
            background: '#e0e0e0',
            width: drawerWidth,
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

    };
});

const theme = createTheme({
});

function VehicleDrawer({addArray, removeArray, handleVehicleSelect, handleRemove, anchorEl, handleClose, handleClick, handleSelect, mobileOpen, handleDrawerToggle}) {

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
        </Hidden>
        <Hidden lgDown>
            <Drawer
                anchor="left"
                open
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
        </Hidden>
        </nav>
            
    );
};

export default VehicleDrawer;