import React, { useState, useEffect } from 'react';
import { getStorySummaryById, getStoryDetailsById, getSprintBacklogStories } from '../story/storyApiService';
import { StorySummaryCard } from '../story/StorySummaryCard';
import { StoryDetailsCard } from '../story/StoryDetailsCard';
import { makeStyles, Grid } from '@material-ui/core';
import { SprintHeader } from './SprintHeader';
import { SprintBody } from './SprintBody';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  pageHeader: {
    height: '8em',
    marginBottom: theme.spacing(4)
  },
  pageBody: {
    // flexGrow: 1
    height: "calc(100% - 8em - 32px)"
  },
  outlined: {
    // border: '2px solid green',
  }
}));

export const SprintPage = () => {
  const classes = useStyles();
  const [storySummary, setSummary] = useState();
  const [storyDetails, setDetails] = useState();
  const [backlogStories, setBacklogStories] = useState();

  useEffect(() => {
    getStorySummaryById(170901710)
      .then(x => setSummary(x));

    getStoryDetailsById(170901710)
      .then(x => setDetails(x));

    getSprintBacklogStories()
      .then(x => setBacklogStories(x));
  }, [])

  return (
    <Grid className={`${classes.root}`} container spacing={2}>
      <Grid className={`${classes.outlined} ${classes.pageHeader}`} item xs={12}>
        <SprintHeader />
      </Grid>
      <Grid className={`${classes.outlined} ${classes.pageBody}`} item xs={12}>
        <SprintBody stories={backlogStories}/>
      </Grid>
    </Grid>
  )
}