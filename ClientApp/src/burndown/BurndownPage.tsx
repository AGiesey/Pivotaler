import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { BurndownChart } from './BurndownChart';
import { BurndownDatapoint } from './burndownInterfaces';
import { SidebarPageLayout } from '../layout/SidebarPageLayout';

const useStyles = makeStyles(theme => ({
  root: {
    width: "calc(100% - 36px)",
    height: "calc(100% - 36px)",
    padding: "1em",
  },
  pageTitle: {
    marginBottom: theme.spacing(3)
  }
}))

export const BurndownPage: React.FC = () => {
  const classes = useStyles();
  const [burndownData, setBurndownData] = useState([] as BurndownDatapoint[])

  return (
    <SidebarPageLayout>
      
        <Paper className={classes.root}>
          <Typography className={classes.pageTitle} variant="h4">Sprint Burndown </Typography>
            {
              burndownData.length
                ? <BurndownChart data={burndownData} />
                : <Typography>Loading...</Typography>
            }   
        </Paper>
      
    </SidebarPageLayout>
  )
}

// export const BurndownPage: React.FC = () => {
//   const classes = useStyles();
//   const [burndownData, setBurndownData] = useState([] as BurndownDatapoint[])

//   useEffect(() => {
//     // TODO: implement new get burndown stuff
//     //getBurndown()
//       //.then((bd: BurndownDatapoint[])  => setBurndownData(bd))
//   }, [])

//   return (
    // <div className={classes.root}>
    //   <Sidebar />
    //   <Paper className={classes.backlogPaper}>
    //     <Typography className={classes.pageTitle} variant="h4">Sprint Burndown </Typography>
    //       {
    //         burndownData.length
    //           ? <BurndownChart data={burndownData} />
    //           : <Typography>Loading...</Typography>
    //       }   
    //   </Paper>
    // </div>
//   )
// }