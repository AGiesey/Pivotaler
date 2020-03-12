import React, { useState } from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { IterationDataPointModel } from './burndownDataModels';
import { addNewDatapoint } from './burndownApiService';

interface AddDatapointProps {
  iterationId: number;
  onAddDatapoint: Function;
}

var useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '30%'
  },
  actionsContainer: {
    display: 'flex',
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  action: {
    marginLeft: theme.spacing(1)
  },
}))

export const AddDatapoint = (props: AddDatapointProps) => {
  const classes = useStyles();

  const [date, setDate] = useState("");
  const [remainingPoints, setRemainingPoints] = useState("");
  const [remainingEverhourPoints, setRemainingEverhourPoints] = useState("");

  const submitNewDatapoint = () => {
    const newDatapoint = {
      iterationId: props.iterationId,
      dateTime: date,
      remainingPoints: parseInt(remainingPoints),
      remainingEverhourPoints: parseInt(remainingEverhourPoints)
    } as IterationDataPointModel

    addNewDatapoint(newDatapoint, props.iterationId)
      .then(() => props.onAddDatapoint());
  }

  const cancel = () => {
    props.onAddDatapoint();
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
      <div className={`${classes.formControl} ${classes.actionsContainer}`}>
        <Button className={classes.action} variant="outlined" size="medium" color="secondary" onClick={cancel}>Cancel</Button>
        <Button className={classes.action} variant="contained" size="medium" color="primary" onClick={submitNewDatapoint}>Add Datapoint</Button>
      </div>
    </form>
  )
}