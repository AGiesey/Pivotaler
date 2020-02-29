import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Typography, TextField, makeStyles, Button } from '@material-ui/core';
import { IterationDataPointModel } from './burndownDataModels';
import { addNewDatapoint } from './burndownApiService';

interface AddDatapointProps {
  iterationId: number
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

export const AddDatapoint = (props: AddDatapointProps) => {
  const classes = useStyles();
  const history = useHistory();

  const [date, setDate] = useState("");
  const [remainingPoints, setRemainingPoints] = useState("");
  const [remainingEverhourPoints, setRemainingEverhourPoints] = useState("");

  const submitNewDatapoint = () => {
    const newDatapoint = {
      iterationId: props.iterationId,
      dateTime: date,
      remainingPoints: parseInt(remainingPoints),
      remainingEverhourPoints: parseInt(remainingPoints)
    } as IterationDataPointModel

    addNewDatapoint(newDatapoint, props.iterationId);
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
        <Button variant="contained" size="medium" color="primary" onClick={submitNewDatapoint}>Add Datapoint</Button>
      </div>
    </form>
  )
}