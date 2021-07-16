import React from 'react';

import { makeStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const moment = require('moment');

const columns = [
    { id: 'startTime', label: 'Start Time', minWidth: 160 },
    { id: 'duration', label: 'Duration(min)', minWidth: 160, format: (value) => value.toFixed(2)},
    { id: 'maxGpsSpeed', label: 'Max Speed(kmph)', minWidth: 170},
    { id: 'avgGpsSpeed', label: 'Average Speed(kmph)', minWidth: 220, format: (value) => value.toFixed(2)},
    { id: 'start_voltage', label: 'Starting Voltage(V)', minWidth: 200},
    { id: 'end_voltage', label: 'Ending Voltage(V)', minWidth: 200},
    { id: 'distance', label: 'Distance(km)', minWidth: 160, format: (value) => value.toFixed(2)},
    { id: 'score', label: 'Driver Score'},
];
  
const useStyles = makeStyles((theme)=>{
    return {
        root: {
            width: '100%'
        },
        container: {
            maxHeight: 300,
            [theme.breakpoints.down('lg')]: {
                maxWidth: '95vw'
            },
        },
    };
});

function VehicleTable({rows, handlePageChange, page}) {

    const classes = useStyles();

    return (
            <>
            {/* Heading */}
            <Typography variant="h5" style={{fontWeight: 'bold'}}>Recent Trips</Typography>
            <br/>

            {rows?
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader>
                        {/* Table Headers */}
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => {
                                    return (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.tripId}>
                                    {columns.map((column) => {
                                        let value;
                                        if(column.id === 'startTime')
                                        {
                                            value = moment(row[column.id]).format('MMM DD, hh:mm a');
                                            
                                        }
                                        else if(column.id === 'duration')
                                        {
                                            const start = moment(row.startTime);
                                            const end = moment(row.endTime)
                                            value = moment.duration(end.diff(start)).asMinutes();
                                            value = parseFloat(value);
                                        }
                                        else if(column.id === 'maxGpsSpeed')
                                        {
                                            value = row[column.id];
                                        }
                                        else if(column.id === 'avgGpsSpeed')
                                        {
                                            value = parseFloat(row[column.id]);
                                        }
                                        else if(column.id === 'start_voltage')
                                        {
                                            value = row.batteryVoltageAdc[row.batteryVoltageAdc.length-1].voltage;
                                        }
                                        else if(column.id === 'end_voltage')
                                        {
                                            value = row.batteryVoltageAdc[0].voltage;
                                        }
                                        else if(column.id === 'distance')
                                        {
                                            value = parseFloat(row[column.id]);
                                        }
                                        else if(column.id === 'score')
                                        {
                                            value = 98.5;
                                        }
                                            
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                        );
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={-1}
                page={page}
                rowsPerPage={10}
                onPageChange={(event, newPage)=>handlePageChange(newPage)}
                />
            </Paper>
            :
            <div className={classes.centerDiv}>
                <Typography align="center" variant="h6" color="secondary">No Vehicle Selected</Typography>
            </div>
            }
        </>
    );
};

export default VehicleTable;