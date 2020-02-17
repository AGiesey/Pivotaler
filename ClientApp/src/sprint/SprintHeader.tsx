import React, { useState } from 'react';
import { Paper, makeStyles, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Schedule } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  select: {
    minWidth: '12em',
    marginRight: theme.spacing(3)
  },
  outlined: {
    // border: '2px solid blue'
  }
}));

interface SprintHeaderProps {

};

export const SprintHeader = (props: SprintHeaderProps) => {
  const classes = useStyles();
  const [currentTeam, setCurrentTeam] = useState();
  const [currentOwner, setCurrentOwner] = useState();

  const teamOptions = [
    {name: "All", value: "all"},
    {name: "TFMS", value: "tfms"},
    {name: "PLCS", value: "plcs"},
    {name: "MDOT", value: "mdot"},
  ]

  const ownerOptions = [
    {name: "Adam Giesey", value: 1},
    {name: "Connor Robinson", value: 2},
  ]

  const selectTeam = (e: any) => {
    console.log(e);
    // setCurrentTeam()
  }

  const selectOwner = (e: any) => {
    console.log(e)
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Typography variant="h3">Scrum Board</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="right"><Schedule /> 5 Days Remaining</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.select}>
            <InputLabel>Select Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentTeam}
              onChange={selectTeam}>
              {teamOptions.map(option => <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Select Owner</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentOwner}
              onChange={selectOwner}>
              {ownerOptions.map(option => <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
    </Paper>
  )
}