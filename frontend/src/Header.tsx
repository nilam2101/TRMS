//import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Face';
import React from "react";
import User from './user/user'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Header() {

    const classes = useStyles();
    let userloginname = User.getName();
    
  return (
    <header>
      <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      TRMS
    </Typography>

    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <FaceIcon /> 
    </IconButton>
    <h6>  Hi, {userloginname} ($1000)</h6>
    <Button variant="contained" color="primary" href="/"> Logout </Button>
  </Toolbar>
</AppBar>
    </header>
  );
}