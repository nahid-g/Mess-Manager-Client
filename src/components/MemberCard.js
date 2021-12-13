import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


const MemberCard=(props) =>{

    const {name, mobile, email, date} = props.member
    //const date=new Date().toLocaleDateString();

    return (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      {/* <TableCell component="th" scope="row">
        <h5>{props.id}</h5>
      </TableCell> */}

      <TableCell align="center"><h4>{name}</h4></TableCell>
      <TableCell align="center"><h4>{mobile}</h4></TableCell>
      <TableCell align="center"><h4>{email}</h4></TableCell>
      <TableCell align="center"><h4>{date ? date:'-'}</h4></TableCell>
    </TableRow>
    )
    
}

export default MemberCard
