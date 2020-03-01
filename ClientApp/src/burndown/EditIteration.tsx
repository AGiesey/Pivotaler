import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, TextField, Button, List, ListItem, IconButton } from '@material-ui/core';
import { getIterationById } from './burndownApiService';
import { IterationDatapointModel } from './iterationModels';
import { Edit } from '@material-ui/icons';
import moment from 'moment';

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

interface EditIterationProps {
  iterationId: number;
  onEditDatapoint: (datapointId: number) => void;
}

export const EditIteration = (props: EditIterationProps) => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialPoints, setInitialPoints] = useState("");
  const [initialEverhourPoints, setInitialEverhourPoints] = useState("");
  const [datapoints, setDatapoints] = useState([] as IterationDatapointModel[])

  useEffect(() => {
    getIterationById(props.iterationId)
      .then(iteration => {
        setStartDate(iteration.startDate.toString());
        setEndDate(iteration.endDate.toString());
        setInitialPoints(iteration.initialPoints.toString());
        setInitialEverhourPoints(iteration.initialEverhourPoints.toString());
        setDatapoints(iteration.dataPoints || [] as IterationDatapointModel[])
        console.log("Datapoints", iteration.dataPoints)
      });
  }, [props.iterationId]);


  // useEffect(() => {

  // }, [datpoints])

  const submitEditSprint = () => {
    
  }
  
  return (
    <div className={classes.root}>
      <form >
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
          <Button variant="contained" size="medium" color="primary" onClick={submitEditSprint}>Save</Button>
        </div>
      </form>
      <Typography variant="h5">Datapoints</Typography>
      <List>
        {
          datapoints.length
        ? datapoints.map((datapoint, index) => <ListItem key={index}> <Typography>{moment(datapoint.dateTime).format('MMM Do')}: &nbsp;</Typography> <Typography>Points: {datapoint.remainingPoints}</Typography><IconButton size="small" color="primary" onClick={() => props.onEditDatapoint(datapoint.iterationDataPointId)}><Edit /></IconButton></ListItem>)
            : <Typography>Loading...</Typography>
        }
      </List>
    </div>
  )
}