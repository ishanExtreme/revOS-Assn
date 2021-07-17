import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
    return {
        modalStyle:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        
        modalContent: {
            // display: 'flex',
            // direction: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
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

function BatteryModal({batteryModalOpen, handleBatteryModalClose, distance}) {

    const classes = useStyles();

    return (
       <Modal
       open={batteryModalOpen}
       onClose={handleBatteryModalClose}
       closeAfterTransition
       className={classes.modalStyle}
       BackdropComponent={Backdrop}
       BackdropProps={{
       timeout: 500,
       }}
       >
           <Slide direction="down" in={batteryModalOpen}>
               <div className={classes.modalContent}>
                    <Typography color="secondary" variant="h6">
                        You can travel another {distance} KM before battery discharges.
                    </Typography>

                    <div className={classes.btnContainer}>
                    <Button 
                    variant="contained" 
                    color="secondary"
                    size="large"
                    onClick={handleBatteryModalClose}
                    >
                        Close
                    </Button>
               </div>
               </div>
           </Slide>
       </Modal>
    );
};

export default BatteryModal;