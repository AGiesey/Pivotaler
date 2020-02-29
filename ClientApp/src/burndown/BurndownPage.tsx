import React, { useState } from 'react';
import { makeStyles, Paper, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
// import { BurndownDatapoint } from './burndownInterfaces';
import { SidebarPageLayout } from '../layout/SidebarPageLayout';
import { MoreVert } from '@material-ui/icons';
import { BurndownChart } from './BurndownChart';
import { AddDatapoint } from './AddDatapoint';
import { EditDatapoint } from './EditDatapoint';
import { EditSprint } from './EditSprint';
import { AddSprint } from './AddSprint';

const useStyles = makeStyles(theme => ({
  root: {
    width: `calc(100% - ${theme.spacing(6)}px)`,
    height: `calc(100% - ${theme.spacing(6)}px)`,
    padding: theme.spacing(2),
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3)
  },
  pageBody: {
    height: `calc(100% - ${theme.spacing(11)}px)`,
    // border: '3px solid green'
  }
}))

enum BurndownPagesEnum {
  SprintBurndown = "Sprint Burndown",
  AddSprintDatapoint = "Add Sprint Datapoint",
  EditSprint = "Edit Sprint",
  EditSprintDatapoints = "Edit Sprint Datapoints",
  AddNewSprint = "Add New Sprint"
}

export const BurndownPage: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [title, setTitle] = useState<string>(BurndownPagesEnum.SprintBurndown)
  // const [burndownData, setBurndownData] = useState([] as BurndownDatapoint[])

  const showBurndownMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onSelectBurndownMenuItem = (event: React.MouseEvent<HTMLLIElement>) => {
    switch(event.currentTarget.id) {
      case "AddSprintDatapoint":
        setTitle(BurndownPagesEnum.AddSprintDatapoint);
        break;
      case "EditSprintDatapoints":
        setTitle(BurndownPagesEnum.EditSprintDatapoints);
        break;
      case "EditSprint":
        setTitle(BurndownPagesEnum.EditSprint);
        break;
      case "AddNewSprint":
        setTitle(BurndownPagesEnum.AddNewSprint);
        break;
      default:
        setTitle(BurndownPagesEnum.SprintBurndown);
    }
    setAnchorEl(null);
  }

  const getPageBody = () => {
    switch(title) {
      case "Add Sprint Datapoint":
        return <AddDatapoint iterationId={3}/>
      case "Edit Sprint Datapoints":
        return <EditDatapoint />
      case "Edit Sprint":
        return <EditSprint />
      case "Add New Sprint":
        return <AddSprint />
      default:
        return <BurndownChart iterationId={3} />
    }
  }

  return (
    <SidebarPageLayout>
      
        <Paper className={classes.root}>
          <div className={classes.pageHeader}>
            <Typography variant="h3">{title}</Typography>
            <IconButton color="secondary" aria-controls="burndown-menu" aria-haspopup="true" onClick={showBurndownMenu}>
              <MoreVert />
            </IconButton>
            <Menu
              id="burndown-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
            >
              <MenuItem id="AddSprintDatapoint" onClick={onSelectBurndownMenuItem}>Add Sprint Datapoint</MenuItem>
              <MenuItem id="EditSprintDatapoints" onClick={onSelectBurndownMenuItem}>Edit Sprint Datapoints</MenuItem>
              <MenuItem id="EditSprint" onClick={onSelectBurndownMenuItem}>Edit Sprint</MenuItem>
              <MenuItem id="AddNewSprint" onClick={onSelectBurndownMenuItem}>Add New Sprint</MenuItem>
            </Menu>
          </div>
          
          <div className={classes.pageBody}>
            {getPageBody()}
          </div>
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