import './login.css';
import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import userService from './user/user.service';
import User from './user/user'

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Login() {
  const [username, setname] = useState('');
  const [pass, setpass] = useState('');
  const history = useHistory();
  const onClickSubmitClaim = () => {

        userService.getLogin(username).then((data:any) => {
            let upassname=[];
            upassname= data.data.data[0]
            let uname = upassname.EmpName
            let upass = upassname.Password
            let urole = upassname.Role
           User.setName(username);
           User.setRole(urole);
            if(uname == username  && upass == pass)
            history.push("/app");
            else
            history.push("/login");
  
    });  
  }

  return (   
    <div className="Login">
    <br /><br />
    <div >
        <h2>TRMS</h2>
        <form noValidate>

        <TextField
            id="standard-full-width"
               
            style={{ margin: 8 }}
            placeholder="Username"
        

            margin="normal"
            InputLabelProps={{
            shrink: true,
            }}
            value={username} onInput={(e:any) => setname(e.target.value)}
        />
        <br />
        <TextField
            id="standard-full-width"
            type="Password" 
            style={{ margin: 8 }}
            placeholder="Password"
    

            margin="normal"
            InputLabelProps={{
            shrink: true,
            }}
            value={pass} onInput={(e:any) => setpass(e.target.value)}
        />
        <br /> <br />
        <Button variant="contained" color="primary" onClick={onClickSubmitClaim}> Login </Button>
          </form>
      
        </div>

     
    
    </div>
 
  );
}

export default Login;