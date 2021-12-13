import React, { useState } from "react";
import { Link } from "react-router-dom";
// import user from "../images/user.png";
// import "./ContactCard.css"

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const BulletinCard = (props) => {
  const { itemName, itemQuantity, addedTime, addedBy } = props.bulletin;

  const [open, setOpen] = useState(false);

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

        <TableCell align="center">
          <h5>{itemName}</h5>
        </TableCell>
        <TableCell align="center">
          <h5>{itemQuantity}</h5>
        </TableCell>
        <TableCell align="center">
          <h5>{addedBy}</h5>
        </TableCell>
        <TableCell
          align="center"
          style={{ backgroundColor: "rgba(67, 225, 235, 0.5)" }}
        >
          <IconButton
            color="warning"
            aria-label="delete buletin"
            fontSize="large"
            onClick={() => props.clickhandler(props.bulletin._id)}
          >
            <TaskAltIcon />
          </IconButton>
          
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                added at {new Date(addedTime).toLocaleTimeString()} on{" "}
                {new Date(addedTime).toLocaleDateString()}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default BulletinCard;
