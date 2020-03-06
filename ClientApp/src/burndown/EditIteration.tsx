import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, TextField, Button, List, ListItem, IconButton } from '@material-ui/core';
import { getIterationById, updateIteration } from './burndownApiService';
import { IterationDatapointModel } from './iterationModels';
import { Edit } from '@material-ui/icons';
import moment from 'moment';

var useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  iterationDataForm: {
    flexBasis: '30%',
    flexShrink: 0
  },
  datapointsContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(8)
  },
  sprintDataActions: {
    display: 'flex',
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  formControl: {
    margin: theme.spacing(1),
  },
  action: {
    marginLeft: theme.spacing(1)
  },
  editDatapointButton: {
    marginLeft: theme.spacing(4)
  }
}))

interface EditIterationProps {
  iterationId: number;
  onEditDatapoint: (datapointId: number) => void;
  onCancelEdit: Function;
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
      });
  }, [props.iterationId]);


  const cancel = () => {
    props.onCancelEdit();
  }

  const submitEditSprint = () => {
    const model = {
      startDate: startDate,
      endDate: endDate,
      initialPoints: parseInt(initialPoints),
      initialEverhourPoints: parseInt(initialEverhourPoints)
    }

    updateIteration(props.iterationId, model)
      .then(iteration => {
        setStartDate(iteration.startDate.toString());
        setEndDate(iteration.endDate.toString());
        setInitialPoints(iteration.initialPoints.toString());
        setInitialEverhourPoints(iteration.initialEverhourPoints.toString());
      })
  }
  
  return (
    <div className={classes.root}>
      <form className={classes.iterationDataForm}>
        <Typography variant="h5">Sprint Data</Typography>
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
        <div className={classes.sprintDataActions}>
          <Button className={classes.action} variant="outlined" size="medium" color="secondary" onClick={cancel}>Back To Sprint</Button>
          <Button className={classes.action} variant="outlined" size="medium" color="primary" onClick={submitEditSprint}>Save</Button>
        </div>
      </form>
      <div className={classes.datapointsContainer}>
        <Typography variant="h5">Datapoints</Typography>
        <List>
          {
            datapoints.length
          ? datapoints.map((datapoint, index) => {
              return (
                <ListItem key={index}> 
                  <Typography>{moment(datapoint.dateTime).format('MMM Do')}: &nbsp;</Typography>
                  <Typography>Points: {datapoint.remainingPoints}</Typography>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <IconButton size="small" color="primary" onClick={() => props.onEditDatapoint(datapoint.iterationDataPointId)}>
                    <Edit />
                  </IconButton>
                </ListItem>
              )
          })
              : <Typography>Loading...</Typography>
          }
        </List>
      </div>
    </div>
  )
}