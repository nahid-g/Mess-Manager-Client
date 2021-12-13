import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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

const AddBulletinForm = (props ) => {

    const {handleClose,addBulletin} = props;
  const classes = useStyles();
  
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState('')
  

  const handleSubmit = e => {
    e.preventDefault()
    
     addBulletin({itemName, itemQuantity})
    
    handleClose()
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        variant="filled"
        required
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      />
      <TextField
        label="Item Quantity" 
        variant="filled"
        required
        value={itemQuantity}
        onChange={e => setItemQuantity(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Add to Board
        </Button>
      </div>
    </form>
  );
};

export default AddBulletinForm;