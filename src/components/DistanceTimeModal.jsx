import React, {useState} from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
            backgroundColor: "white",
            padding: 20,
            border: 'solid 2px #ffab00',
            boxShadow: theme.shadows[5],
        },

        container: {
            display: 'flex',
            direction: 'column',
            justifyContent: 'center',
            marginTop: theme.spacing(3)
        }
    };
});

function DistanceTimeModal({openDistanceModal, handleDistanceModalClose, oneUnitTime}) {

    const classes = useStyles();

    // distance value
    const [value, setValue] = useState(0);
    // time calculated
    const [time, setTime] = useState("");

    const handleChange = (event)=>{
        setValue(event.target.value);
    };

    const getTime = ()=>{

        const timeVal = ((oneUnitTime*value)/60).toFixed(2);
        setTime(timeVal); 
    }

    // close the modal and set time to empty
    const handleClose = ()=>{

        setTime("");
        handleDistanceModalClose();
    }

    return (
       <Modal
       open={openDistanceModal}
       onClose={handleDistanceModalClose}
       closeAfterTransition
       className={classes.modalStyle}
       BackdropComponent={Backdrop}
       BackdropProps={{
       timeout: 500,
       }}
       >
           <Slide direction="down" in={openDistanceModal}>
               <div className={classes.modalContent}>
                    <Typography color="secondary" variant="h6">
                        Type the distance to get average time
                    </Typography>

                    
                    <div className={classes.container}>

                        <TextField
                        label="Distance(km)"
                        value={value}
                        onChange={handleChange}
                        type="number"
                        color="secondary"
                        />
                    </div>

                    <div className={classes.container}>

                        <Button 
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={getTime}
                        >
                            Get Time
                        </Button>
                    </div>

                    {time&&
                    <div className={classes.container}>

                        <Typography color="secondary" variant="subtitle2">
                            It will take on an average {time} hrs to travel {value} km
                        </Typography>
                    </div>
                    }

                    <div className={classes.container}>
                        <Button 
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={handleClose}
                        >
                            Close
                        </Button>
                    </div>

               </div>

           </Slide>
       </Modal>
    );
};

export default DistanceTimeModal;