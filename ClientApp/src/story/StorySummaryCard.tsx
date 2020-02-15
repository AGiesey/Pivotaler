import React from 'react';
import { StorySummaryModel } from '../story/storyObjects';
import { Card, Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  feature: {
    backgroundColor: 'green',
  },
  bug: {
    backgroundColor: 'orangeRed',
  },
  chore: {
    backgroundColor: 'darkGray',
  },
  release: {
    backgroundColor: 'mediumBlue',
  }
}))

interface StorySummaryCardProps {
  data: StorySummaryModel;
}

export const StorySummaryCard = (props: StorySummaryCardProps) => {
  const classes = useStyles();
  const {title, storyType, estimate, currentState, ownerIds } = props.data;
  
  return (
    <Card>
      <Grid container spacing={1}>
        <Grid className={classes[storyType]} item xs={1}>
        </Grid>
        <Grid item xs={1}>  
          <Typography variant="h6">{estimate}</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" noWrap>{title}<span>({ownerIds[0]})</span></Typography>
        </Grid>
      </Grid>
      {/* <Grid container spacing={1}>
        <code>{JSON.stringify(props.data)}</code>
      </Grid> */}
    </Card>
  )
}