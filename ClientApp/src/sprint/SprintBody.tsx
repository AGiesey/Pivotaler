import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Grid, Typography } from '@material-ui/core';
import { StorySummaryModel, storyStates } from '../story/storyObjects';
import { StorySummaryCard } from '../story/StorySummaryCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexFrow: 1,
    width: '100%',
    padding: theme.spacing(1)
  },
  swimLaneContainer: {
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  lane: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    height: `calc(100% - ${theme.spacing(4)}px)`,
    padding: theme.spacing(1)
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
      <div className={classes.swimLaneContainer}>
        <div className={classes.lane}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Unstarted</Typography>
            <hr />
            {groupedStories
              ? groupedStories.unstarted.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </ Paper>
        </div>
        <div className={classes.lane}>
        <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Started</Typography>
            <hr />
            {groupedStories
              ? groupedStories.started.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </ Paper>
        </div>
        <div className={classes.lane}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Code Review</Typography>
            <hr />
            {groupedStories
              ? groupedStories.finished.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </Paper>
        </div>
        <div className={classes.lane}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Accept / Reject</Typography>
            <hr />
            {groupedStories
              ? groupedStories.delivered.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </Paper>
        </div>
        <div className={classes.lane}>
          <Paper className={classes.lane} variant="outlined">
            <Typography variant="h5">Done Done</Typography>
            <hr />
            {groupedStories
              ? groupedStories.released.map((x: StorySummaryModel) => <StorySummaryCard key={x.id} data={x} />)
              : "Loading"
            }
          </Paper>
        </div>
      </div>
    </Paper>
  )
}