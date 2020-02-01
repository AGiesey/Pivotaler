import React, { useEffect, useState } from 'react';
import { getBurndown, getProjectSnapshots, getCurrentBacklogStories, BurndownDatapoint } from './burndownPivotalService'
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { BurndownChart } from './BurndownChart';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backlogPaper: {
    width: "80%",
    height: "80%",
    padding: "1em"
  }
}))

const BurndownPage: React.FC = () => {
  const classes = useStyles();
  const [burndownData, setBurndownData] = useState([] as BurndownDatapoint[])
  const [snapshot, setSnapshot] = useState();
  const [stories, setStories] = useState();

  useEffect(() => {
    getProjectSnapshots()
      .then(x => console.log("Project Snapshots", x));

    getCurrentBacklogStories()
      .then(x => console.log("Backlog Stories", x))
  }, [])

  useEffect(() => {
    getBurndown()
      .then((bd: BurndownDatapoint[])  => setBurndownData(bd))
  }, [burndownData])

  return (
    <div className={classes.root}>
      <Paper className={classes.backlogPaper}>
        <Typography variant="h4">Sprint Burndown </Typography>
          {
            burndownData.length
              ? <BurndownChart data={burndownData} />
              : <Typography>Loading...</Typography>
          }   
      </Paper>
    </div>
  )
}

export default BurndownPage;