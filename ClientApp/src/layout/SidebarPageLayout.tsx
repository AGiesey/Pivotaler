import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';
import { Sidebar } from '../navigation/Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  sidebar: {
    width: '5%',
    flexShrink: 0,
    paddingTop: theme.spacing(4)
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    margin: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
}))

interface PageProps {
  children?: ReactNode;
}

// TODO: look into react-children-utilites
export const SidebarPageLayout: React.FC = (props: PageProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.body}>
        {props.children}
      </div>
    </div>
  )
}