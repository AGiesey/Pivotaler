import React from 'react';
import { StorySummaryModel, storyTypes } from '../story/storyObjects';
import { Card, Typography, makeStyles, IconButton, } from '@material-ui/core';
import { BugReport, Star, Settings, Flag, OpenInNew } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    height: '8.4em',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  titleContainer: {
    flexGrow: 1,
    padding: theme.spacing(2),
    overflow: 'hidden',
    position: 'relative'
  },
  fadeTitle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '15px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.78) 58%, rgba(255,255,255,1) 74%)'
  },
  metaContainer: {
    display: 'flex',
    padding: `0 ${theme.spacing(2)}px`,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0
  },
  metaLeftContainer: {
    display: 'flex'
  }
}))

interface StorySummaryCardProps {
  data: StorySummaryModel;
  key: number;
}

const getStoryIcon = (storyType: storyTypes) => {
  switch(storyType) {
    case storyTypes.bug:
      return <BugReport />
    case storyTypes.feature:
      return <Star />
    case storyTypes.chore:
      return <Settings />
    case storyTypes.release:
      return <Flag />
  }
}

export const StorySummaryCard = (props: StorySummaryCardProps) => {
  const classes = useStyles();
  const { title, storyType, estimate } = props.data;
  
  return (
    <Card className={classes.root}>
      
      <div className={classes.titleContainer}>
        <Typography>{title}</Typography>
        <div className={classes.fadeTitle}></div>
      </div>
      
      <div className={classes.metaContainer}>
        <div className={classes.metaLeftContainer}>
          {getStoryIcon(storyType)}
          <Typography>{estimate}</Typography>
        </div>
        <div>
          <IconButton color="secondary">
            <OpenInNew />
          </IconButton>
        </div>
      </div>
    </Card>
  )
}