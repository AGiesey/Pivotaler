import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Grid, Typography } from '@material-ui/core';
import { StorySummaryModel, storyStates } from '../story/storyObjects';
// import { StoryDetailsCard } from '../story/StoryDetailsCard';
import { StorySummaryCard } from '../story/StorySummaryCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    // padding: theme.spacing(2)
  },
  swimLaneContainer: {
    height: `100%`,
    overflow: 'auto',
    paddingRight: theme.spacing(2)
  },
  lane: {
    height: '100%',
    padding: theme.spacing(2)
  }
}))

interface SprintBodyProps {
  stories: StorySummaryModel[]
}

interface GroupedStories {
  unstarted: StorySummaryModel[];
  started: StorySummaryModel[];
  finished: StorySummaryModel[];
  delivered: StorySummaryModel[];
  released: StorySummaryModel[]
}

export const SprintBody = (props: SprintBodyProps) => {
  const classes = useStyles();
  const {stories} = props;
  const [groupedStories, setGroupedStories] = useState();

  useEffect(() => {
    const groups = {
      unstarted: [],
      started: [],
      finished: [],
      delivered: [],
      released: []
    } as GroupedStories;

    if (stories && stories.length && stories[0] !== undefined) {
      stories.forEach((x: StorySummaryModel) => {
        x.currentState === storyStates.rejected || x.currentState === storyStates.accepted
          ? groups.released.push(x)
          : groups[x.currentState].push(x)
      })
    }

    setGroupedStories(groups);
  }, [stories])
  
  return (
    <Paper className={classes.root}>
      <Grid className={classes.swimLaneContainer} container justify="flex-end" spacing={2}>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Unstarted</Typography>
            <hr />
            {groupedStories
              ? groupedStories.unstarted.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </ Paper>
        </Grid>
        <Grid className={classes.lane} item xs={2}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Started</Typography>
            <hr />
            {groupedStories
              ? groupedStories.started.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </Paper>
        </Grid>
        <Grid className={classes.lane} item xs={2}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Code Review</Typography>
            <hr />
            {groupedStories
              ? groupedStories.finished.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </Paper>
        </Grid>
        <Grid className={classes.lane} item xs={2}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Accept / Reject</Typography>
            <hr />
            {groupedStories
              ? groupedStories.delivered.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </Paper>
        </Grid>
        <Grid className={classes.lane} item xs={2}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Done Done</Typography>
            <hr />
            {groupedStories
              ? groupedStories.released.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}