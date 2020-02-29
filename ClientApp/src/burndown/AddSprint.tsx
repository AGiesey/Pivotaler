import React, { useState } from 'react';
import { Typography, makeStyles, TextField, Button } from '@material-ui/core';
import { allLabels } from './EditDatapoint';
import { addNewIteration } from './burndownApiService';
import { IterationModel } from './burndownDataModels';

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

export const AddSprint = () => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialPoints, setInitialPoints] = useState("");
  const [initialEverhourPoints, setInitialEverhourPoints] = useState("");

  const submitAddIteration = () => {
    const newIteration = {
      startDate: startDate,
      endDate: endDate,
      initialPoints: parseInt(initialPoints),
      initialEverhourPoints: parseInt(initialEverhourPoints)
    } as IterationModel

    addNewIteration(newIteration)

  }
  
  return (
    <form className={classes.root}>
      <div className={classes.formControl}>
        <TextField label="Start Date" fullWidth={true} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
      </div>
      <div className={classes.formControl}>
        <TextField label="End Date" fullWidth={true} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
      </div>
      <div className={classes.formControl}>
        <TextField label="Initial Points" fullWidth={true} value={initialPoints} onChange={(e) => setInitialPoints(e.target.value)}/>
      </div>
      <div className={classes.formControl}>
        <TextField label="Initial Everhour Points" fullWidth={true} value={initialEverhourPoints} onChange={(e) => setInitialEverhourPoints(e.target.value)}/>
      </div>
      <div className={classes.formControl}>
        <Button variant="contained" size="medium" color="primary" onClick={submitAddIteration}>Add Sprint</Button>
      </div>
    </form>
  )
}