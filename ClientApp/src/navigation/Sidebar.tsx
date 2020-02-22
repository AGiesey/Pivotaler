import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, IconButton } from '@material-ui/core';
import { TrendingDown, Today } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
}))

interface SidebarProps {

}

export const Sidebar = (props: SidebarProps) => {
  const classes = useStyles();
  const history = useHistory();

  const navigate = (path: string) => {
    history.push(path);
  }

  return (
    <div className={classes.root}>
      <IconButton color="primary" onClick={() => navigate('/burndown')}>
        <TrendingDown />
      </IconButton>
      <IconButton color="primary" onClick={() => navigate('/sprint')}>
        <Today />
      </IconButton>
    </div>
  )
}