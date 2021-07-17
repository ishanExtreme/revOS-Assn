import React from 'react';

import GoogleMapReact from 'google-map-react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import DriveEtaIcon from '@material-ui/icons/DriveEta';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
    return {
        modalStyle:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        
        modelContent: {
            height: '80%',
            width: '80%',
            backgroundColor: "#212121",
            padding: 20,
            border: 'solid 2px #ffab00',
            boxShadow: theme.shadows[5],
        },
        btnContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing(3)
        }
    };
});

function Map({vehicle, mapOpen, handleMapClose}) {

    const classes = useStyles();
    
    const mapOptions = {
            center: {
                lat: parseFloat(vehicle.location.latitude),
                lng: parseFloat(vehicle.location.longitude),
            },
            zoom: 16,
            lat: parseFloat(vehicle.location.latitude),
            lng: parseFloat(vehicle.location.longitude)
        }


    return (
        
        <Modal
        open={mapOpen}
        onClose={handleMapClose}
        closeAfterTransition
        className={classes.modalStyle}
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
            
            <Slide direction="down" in={mapOpen}>
                
                    <div className={classes.modelContent}>
                        <GoogleMapReact
                        defaultCenter={mapOptions.center}
                        defaultZoom={mapOptions.zoom}
                        >
                            <DriveEtaIcon lat={mapOptions.lat} lng={mapOptions.lng} color="inherit" fontSize="large"/>
                        </GoogleMapReact>

                        <div className={classes.btnContainer}>
                            <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={handleMapClose}
                            size="large"
                            >
                                Close
                            </Button>
                        </div>

                    </div>

            </Slide>

        </Modal>

    );
};

export default Map;