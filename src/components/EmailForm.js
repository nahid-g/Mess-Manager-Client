import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios'



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const EmailForm = (props ) => {

    const {handleClose} = props;
  const classes = useStyles();
  
  const [email, setEmail] = useState('');
 
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const [, token] = document.cookie.split("=");
    const req = {
        token,
        email
    }
    console.log(req)
    alert("please wait a moment")
    const res = await axios.post("http://localhost:4004/invite", req, {
      withCredentials: true,
    });
    console.log(res.data);
    if(res.data.result === 'success'){
        alert("Your mail is sent")
        handleClose()
    }
    else
        alert("Email was not sent")
    
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        required
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Invite
        </Button>
      </div>
    </form>
  );
};

export default EmailForm;