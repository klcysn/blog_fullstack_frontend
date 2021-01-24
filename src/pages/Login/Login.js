import React from 'react';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import {useStyles} from "./Login.style"


export function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Link to="/" className={classes.closeIcon}>
            <CloseIcon />
        </Link>
        <LockIcon color="primary" className={classes.icon} />
        <form className={classes.form} autoComplete="off">
        <TextField
            id="outlined-secondary"
            label="User Name"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="text"
        />
        <TextField
            id="outlined-secondary"
            label="Password"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="password"
        />
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        >
        Sign In
        </Button>
        <Typography className={classes.link}>
        Don't you have an account? <Link to="/register">Register</Link>
        </Typography>
        </form>
    </div>
  );
}