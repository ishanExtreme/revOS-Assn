import React from 'react';

import { makeStyles } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme)=>{
    return {
    };
});

function Toast({openToast, handleToastClose, message}) {

    const classes = useStyles();

    return (
        <Snackbar 
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message={message}
        />
    );
};

export default Toast;