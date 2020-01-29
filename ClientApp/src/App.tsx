import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Toolbar, Typography, AppBar, makeStyles } from '@material-ui/core';
import Burndown from './burndown/Burndown';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleAddendum: {
    fontWeight: "bold",
    fontSize: "1.2em",
    transform: "rotate(20deg)"
  },
  body: {
    height: "calc(100vh - 64px)",
    paddingTop: ".5em"
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Pivotal<span className={classes.titleAddendum}>er</span>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
          <Router>
            <Switch>
              <Route path="/">
                <Burndown></Burndown>
              </Route>
            </Switch>
          </Router>
      </div>
    </div>
  );
}

export default App;
