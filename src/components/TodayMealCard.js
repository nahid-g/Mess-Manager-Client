import React, { useState } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


function TodayMealCard(props) {

    const {name, breakfast, lunch, dinner} = props.mem

    return (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      {/* <TableCell component="th" scope="row">
        <h5>{props.id}</h5>
      </TableCell> */}

      <TableCell align="center"><h4>{name}</h4></TableCell>
      <TableCell align="center"><h4>{breakfast}</h4></TableCell>
      <TableCell align="center"><h4>{lunch}</h4></TableCell>
      <TableCell align="center"><h4>{dinner}</h4></TableCell>
    </TableRow>
    )
}

export default TodayMealCard
