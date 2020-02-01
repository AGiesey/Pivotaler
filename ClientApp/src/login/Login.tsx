import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, Paper, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    width: "20%",
    padding: "1em"
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: ".5em",
    marginBottom: ".75em"
  },
  formElement: {
    marginTop: ".75em"
  },
  actionsContainer: {
    display: "flex",
    marginTop: "1em"
  },
  actionButton: {
    marginRight: ".5em"
  }
}));

export const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
    history.push('./burndown');
  }
  
  return (
    <div className={classes.root}>
      <Paper className={classes.loginCard}>
        <Typography variant="h4">Login: </Typography>
        <form className={classes.loginForm} autoComplete="off" noValidate>
          <TextField 
            className={classes.formElement} 
            name="email" 
            label="Email"
            type="text"
            variant="outlined" 
            placeholder="Email" 
            autoFocus/>
          <TextField 
            className={classes.formElement} 
            name="password" 
            label="Password" 
            type="password" 
            variant="outlined" 
            placeholder="Password" />
          <div className={classes.actionsContainer}>
            <Button 
              className={classes.actionButton} 
              variant="contained" 
              color="primary"
              onClick={onLogin}>
              Login
            </Button>
            <Button 
              className={classes.actionButton} 
              variant="outlined" 
              color="secondary"
              onClick={onLogin}>
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}