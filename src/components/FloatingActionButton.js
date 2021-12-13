import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {Zoom} from '@mui/material'

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'auto',
};

export default function FloatingActionButtons() {
  return (

    <Zoom
    in = {true}
    timeout = {{enter:500, exit:500}}
    unmountOnExit
    >
    
      <Fab anchor="right" style={{style}} variant='extended' color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      {/* <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab> */}
      </Zoom>
    
  );
}



