import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Toolbar, Typography, AppBar, makeStyles, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { pivotalerTheme } from './muiTheme/pivotalerTheme';
import BurndownPage from './burndown/BurndownPage';
import { Login } from './login/Login';
import { Register } from './register/Register';
import { SprintPage } from './sprint/SprintPage';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    overflow: "hidden",
    background: theme.palette.grey[200]
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
    paddingTop: ".5em",
    display: "flex",
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  //TODO: make a real auth
  const [auth, setAuth] = useState(false);

  return (
    <ThemeProvider theme={pivotalerTheme} >
      <div className={classes.root}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Pivotal<span className={classes.titleAddendum}>er</span>
              </Typography>
              {
                auth 
                  ? <Button color="inherit" component={Link} to={'/login'}>Logout</Button>
                  : <Button color="inherit" component={Link} to={'/login'}>Login</Button>
              }
            </Toolbar>
            
          </AppBar>
          <div className={classes.body}>
            <Switch>
              <Route exact path="/" redir>
                { auth ? <Redirect to="/burndown" /> : <Redirect to="/login" /> }
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/burndown">
                <BurndownPage />
              </Route>
              <Route path="/sprint">
                <SprintPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
