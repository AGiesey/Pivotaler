import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Sidebar } from '../navigation/Sidebar';
import { BurndownChart } from './BurndownChart';
import { BurndownDatapoint } from './burndownInterfaces';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backlogPaper: {
    width: "80%",
    height: "80%",
    padding: "1em",
    marginRight: "5%"
  },
  pageTitle: {
    marginBottom: theme.spacing(3)
  }
}))

const BurndownPage: React.FC = () => {
  const classes = useStyles();
  const [burndownData, setBurndownData] = useState([] as BurndownDatapoint[])

  useEffect(() => {
    // TODO: implement new get burndown stuff
    //getBurndown()
      //.then((bd: BurndownDatapoint[])  => setBurndownData(bd))
  }, [])

  return (
    <div className={classes.root}>
      <Sidebar />
      <Paper className={classes.backlogPaper}>
        <Typography className={classes.pageTitle} variant="h4">Sprint Burndown </Typography>
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