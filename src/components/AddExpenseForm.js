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

const AddExpenseForm = (props ) => {

    const {handleClose,addExpense} = props;
  const classes = useStyles();
  
  const [desc, setDesc] = useState('');
  const [paid, setPaid] = useState();
  

  const handleSubmit = e => {
    e.preventDefault();
    // const newDate = new Date(date).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    //  console.log(name,desc,paid,date,newDate);
    
     addExpense({desc, paid})
    //  addExpense({
    //      name,desc,paid,date
    //  })
    handleClose()
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Description"
        variant="filled"
        required
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <TextField
        label="Expense" 
        variant="filled"
        required
        value={paid}
        onChange={e => setPaid(parseInt(e.target.value))}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Add Expense
        </Button>
      </div>
    </form>
  );
};

export default AddExpenseForm;