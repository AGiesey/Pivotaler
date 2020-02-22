import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, Paper, Typography, TextField, Button } from "@material-ui/core";
import { login } from './loginApiService';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    width: "20%",
    minWidth: "25em",
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (): void => {
    login({email: email, password: password})
      .then(result => {
        history.push('./sprint')
      },
      error => console.error("ERROR", error))
  }

  const goToRegister = (e: React.MouseEvent<HTMLButtonElement>): void => {
    history.push('./register');
  }
  
  return (
    <div className={classes.root}>
      <Paper className={classes.loginCard} elevation={2}>
        <Typography variant="h4">Login </Typography>
        <form className={classes.loginForm} autoComplete="off" noValidate>
          <TextField 
            className={classes.formElement} 
            name="email" 
            label="Email"
            type="text"
            variant="outlined"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)} 
            placeholder="Email" 
            autoFocus/>
          <TextField 
            className={classes.formElement} 
            name="password" 
            label="Password" 
            type="password" 
            variant="outlined"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
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
              onClick={goToRegister}>
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}