import React, { useState } from "react";
// import { Table } from "semantic-ui-react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const MealCard = (props) => {
  const [open, setOpen] = useState(false);
  const { name, description, expense, date } = props.expense;
  //console.log(props.id);
  console.log(props.expense.name);

  return (
      <React.Fragment>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="smal"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        <h5>{props.id}</h5>
      </TableCell>
      <TableCell align="right"><h5>{name}</h5></TableCell>
      <TableCell align="right"><h5>{expense}</h5></TableCell>
      <TableCell align="right"><h5>{date}</h5></TableCell>
    </TableRow>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                {description}
              </Typography>
                
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
</React.Fragment>
  );
};

export default MealCard;
