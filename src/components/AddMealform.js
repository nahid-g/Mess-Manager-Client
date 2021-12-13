import React, { useState,useEffect } from "react";
// import { Table } from "semantic-ui-react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";



function AddMealForm(props) {

    const {name,breakfast,lunch,dinner} = props.mem
    const [member,setMember] = useState({
      breakfast,
      lunch,
      dinner 
    })
    // const []

    useEffect(()=>{
        props.mem.breakfast=member.breakfast
        props.mem.lunch=member.lunch
        props.mem.dinner=member.dinner
    },[member])

    return (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      {/* <TableCell component="th" scope="row">
        <h5>{props.id}</h5>
      </TableCell> */}

      <TableCell align="center"><h4>{name}</h4></TableCell>
      <TableCell align="center">
          <input type="text" value={member.breakfast} onChange={(e)=> setMember({...member, breakfast:parseInt(e.target.value)})}/>
        </TableCell>
        <TableCell align="center">
          <input type="text" value={member.lunch} onChange={(e)=> setMember({...member, lunch:parseInt(e.target.value)})}/>
        </TableCell>
        <TableCell align="center">
          <input type="text" value={member.dinner} onChange={(e)=> setMember({...member, dinner:parseInt(e.target.value)})}/>
        </TableCell>
      
    </TableRow>
    )
}

export default AddMealForm
