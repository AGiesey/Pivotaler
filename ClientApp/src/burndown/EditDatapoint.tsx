import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { getDatapointById, updateDatapoint } from './burndownApiService';
import { IterationDataPointModel } from './burndownDataModels';

interface EditDatapointProps {
    datapointId: number | undefined;
    onEditDatapoint: Function;
}

var useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    formControl: {
      margin: theme.spacing(1),
      width: '30%'
    }
  }))

export const EditDatapoint = (props: EditDatapointProps) => {
    const classes = useStyles();
    
    const [datapointId, setDatapointId] = useState();
    const [date, setDate] = useState("");
    const [remainingPoints, setRemainingPoints] = useState("");
    const [remainingEverhourPoints, setRemainingEverhourPoints] = useState("");

    useEffect(() => {
        if (!props.datapointId) {
            return;
        }

        getDatapointById(props.datapointId)
            .then((datapoint: IterationDataPointModel) => {
                setDate(datapoint.dateTime);
                setRemainingPoints(datapoint.remainingPoints ? datapoint.remainingPoints.toString() : "");
                setRemainingEverhourPoints(datapoint.remainingEverhourPoints ? datapoint.remainingEverhourPoints.toString() : "");
                setDatapointId(datapoint.iterationDataPointId);
            })
    }, [props.datapointId]);

    const submitEditDatapoint = () => {
        const model = {
            dateTime: date,
            remainingPoints: parseInt(remainingPoints) || null,
            remainingEverhourPoints: parseInt(remainingEverhourPoints) || null,
        };

        // TODO: Error handling
        updateDatapoint(datapointId, model)
            .then(() => props.onEditDatapoint());
    }

    return (
        <form className={classes.root}>
            <div className={classes.formControl}>
                <TextField label="Date" fullWidth={true} value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className={classes.formControl}>
                <TextField label="Remaining Points" fullWidth={true} value={remainingPoints} onChange={(e) => setRemainingPoints(e.target.value)}/>
            </div>
            <div className={classes.formControl}>
                <TextField label="Remaining Everhour Points" fullWidth={true} value={remainingEverhourPoints} onChange={(e) => setRemainingEverhourPoints(e.target.value)} />
            </div>
            <div className={classes.formControl}>
                <Button variant="contained" size="medium" color="primary" onClick={submitEditDatapoint}>Save</Button>
            </div>
        </form>
    )
}