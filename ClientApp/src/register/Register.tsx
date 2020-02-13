import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { register } from './registerApiService';
import { makeStyles, Paper, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  registerCard: {
    width: "20%",
    minWidth: "300px",
    padding: "1em"
  },
  registerForm: {
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

export const Register: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onRegister = (e: React.MouseEvent<HTMLButtonElement>): void => {
    
    const registerUser = {
      UserName: userName,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword
    }

    register(registerUser)
      .then(x => {
        history.push('./login');
      }, error => console.log(error))
  }
  
  return (
    <div className={classes.root}>
      <Paper className={classes.registerCard} elevation={2}>
        <Typography variant="h4">Register </Typography>
        <form className={classes.registerForm} autoComplete="off" noValidate>
          <TextField 
            className={classes.formElement} 
            name="userName" 
            label="User Name"
            type="text"
            variant="outlined" 
            placeholder="User Name"
            onChange={e => setUserName(e.target.value)} 
            autoFocus/>
          <TextField 
            className={classes.formElement} 
            name="email" 
            label="Email"
            type="text"
            variant="outlined" 
            placeholder="Email" 
            onChange={e => setEmail(e.target.value)}/>
          <TextField 
            className={classes.formElement} 
            name="password" 
            label="Password" 
            type="password" 
            variant="outlined" 
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)}/>
          <TextField 
            className={classes.formElement} 
            name="confirmPassword" 
            label="Confirm Password" 
            type="password" 
            variant="outlined" 
            placeholder="Confirm Password" 
            onChange={e => setConfirmPassword(e.target.value)}/>
          <div className={classes.actionsContainer}>
            <Button 
              className={classes.actionButton} 
              variant="contained" 
              color="primary"
              onClick={onRegister}>
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}