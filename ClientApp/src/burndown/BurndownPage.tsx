import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { makeStyles, Paper, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { SidebarPageLayout } from '../layout/SidebarPageLayout';
import { MoreVert } from '@material-ui/icons';
import { BurndownChart } from './BurndownChart';
import { AddDatapoint } from './AddDatapoint';
import { EditDatapoint } from './EditDatapoint';
import { EditIteration } from './EditIteration';
import { AddIteration } from './AddIteration';

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
  EditSprintDatapoint = "Edit Sprint Datapoint",
  AddNewSprint = "Add New Sprint"
}

export const BurndownPage: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [title, setTitle] = useState<string>(BurndownPagesEnum.SprintBurndown);
  
  const [currentIterationId, setCurrentIterationId] = useState(4);
  const [currentDatapointId, setCurrentDatapointId] = useState<number | undefined>();

  const showBurndownMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onSelectBurndownMenuItem = (event: React.MouseEvent<HTMLLIElement>) => {
    switch(event.currentTarget.id) {
      case "AddSprintDatapoint":
        setTitle(BurndownPagesEnum.AddSprintDatapoint);
        break;
      case "EditSprintDatapoint":
        setTitle(BurndownPagesEnum.EditSprintDatapoint);
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

  const editDatapoint = (datapointId: number) => {
    setCurrentDatapointId(datapointId);
    setTitle(BurndownPagesEnum.EditSprintDatapoint)
  }

  const goToBurndown = (iterationId?: number) => {
    if (iterationId) {
      setCurrentIterationId(iterationId);
    }
    setTitle(BurndownPagesEnum.SprintBurndown)
  }

  const getPageBody = () => {
    switch(title) {
      case "Add Sprint Datapoint":
        return <AddDatapoint iterationId={currentIterationId}/>
      case "Edit Sprint Datapoint":
        return <EditDatapoint datapointId={currentDatapointId} onEditDatapoint={goToBurndown}/>
      case "Edit Sprint":
        return <EditIteration iterationId={currentIterationId} onEditDatapoint={editDatapoint} onCancelEdit={goToBurndown}/>
      case "Add New Sprint":
        return <AddIteration />
      default:
        return <BurndownChart iterationId={currentIterationId} onSetCurrentIterationId={setCurrentIterationId}/>
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
              <MenuItem id="EditSprint" onClick={onSelectBurndownMenuItem}>Edit Sprint</MenuItem>
              <MenuItem id="AddNewSprint" onClick={onSelectBurndownMenuItem}>Add New Sprint</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)} color="secondary">Close Menu</MenuItem>
            </Menu>
          </div>
          
          <div className={classes.pageBody}>
            {getPageBody()}
          </div>
        </Paper>
      
    </SidebarPageLayout>
  )
}

// return (
//   <SidebarPageLayout>
//     <Paper className={classes.root}>
//       <div className={classes.pageHeader}>
//         <Typography variant="h3">{title}</Typography>
//         <IconButton color="secondary" aria-controls="burndown-menu" aria-haspopup="true" onClick={showBurndownMenu}>
//             <MoreVert />
//           </IconButton>
//           <Menu
//             id="burndown-menu"
//             anchorEl={anchorEl}
//             keepMounted
//             open={Boolean(anchorEl)}
//           >
//             <MenuItem id="AddSprintDatapoint"></MenuItem>
//             <MenuItem id="EditSprintDatapoints"></MenuItem>
//             <MenuItem id="EditSprint"></MenuItem>
//             <MenuItem id="AddNewSprint"></MenuItem>
//           </Menu>
//       </div>
//     </Paper>
//   </SidebarPageLayout>
// )