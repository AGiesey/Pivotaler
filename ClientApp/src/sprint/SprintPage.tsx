import React, { useState, useEffect } from 'react';
import { getStorySummaryById } from '../story/storyApiService';
import { StorySummaryCard } from '../story/StorySummaryCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  }
}));

export const SprintPage = () => {
  const classes = useStyles();
  const [story, setStory] = useState();

  useEffect(() => {
    getStorySummaryById(1)
      .then(x => setStory(x))
  }, [])

  return (
    <div className={classes.root}>
      {story 
        ? <StorySummaryCard data={story} />
        : "Loading..."
      }
      
    </div>
  )
}