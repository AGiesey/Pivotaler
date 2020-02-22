import React from 'react';
import { Paper, makeStyles, Typography, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import { Schedule, ChevronLeft, ChevronRight } from '@material-ui/icons';

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
  teamOptions: { name: string, id: number }[]
  ownerOptions: { name: string, teamId: number, searchId: string }[]
  selectedOwnerSearchId: string,
  selectedTeamId: number,
  onSelectTeam: (teamId: number) => void,
  onSelectOwner: (searchId: string ) => void,
};

export const SprintHeader = (props: SprintHeaderProps) => {
  const classes = useStyles();
  const { teamOptions, ownerOptions, selectedOwnerSearchId, selectedTeamId, onSelectTeam, onSelectOwner } = props

  const selectTeam = (e: any) => {
    onSelectTeam(e.target.value);
  }

  const selectOwner = (e: any) => {
    onSelectOwner(e.target.value);
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Typography variant="h3">Scrum Board</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="right"><Schedule /> 9 Days Remaining</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.select}>
            <InputLabel>Select Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTeamId}
              onChange={selectTeam}>
              {teamOptions.map(option => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Select Owner</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOwnerSearchId}
              onChange={selectOwner}>
              {ownerOptions.map((option: any) => <MenuItem key={option.searchId} value={option.searchId}>{option.name}</MenuItem>)}
            </Select>
          </FormControl>
          <IconButton color="secondary">
            <ChevronLeft />
          </IconButton>
          <IconButton color="secondary">
            <ChevronRight />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}