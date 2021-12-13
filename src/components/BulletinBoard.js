import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";

import BulletinCard from "./BulletinCard";
import AddBulletinForm from "./AddBulletinForm";

// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BulletinBoard = (props) => {
  //   console.log(props.getContactId);
  //   const deleteConactHandler = (id) => {
  //     props.getContactId(id);
  //   };

    const navigate= useNavigate()
  const bulletins = props.bulletins;
  const [, token] = document.cookie.split("=");

  const addBulletin = async ({ itemName, itemQuantity }) => {
    //console.log(pulletins)
    const req = {
      token,
      itemName,
      itemQuantity,
    };
    console.log(req);

    const res = await axios.post("http://localhost:4004/bulletin/add", req, {
      withCredentials: true,
    });
    console.log(res);
    props.reload();
    //navigate('/home')

  };



  const markAsDone = async(id)=>{
      console.log(id.toString())
      //console.log(token)
    const req = {
        headers:{
            token
        },
        data:{
            token
        }
      };
      //console.log(req);
      const res = await axios.delete(`http://localhost:4004/bulletin/delete/${id.toString()}`,req, {
        withCredentials: true,
      })

      console.log(res.data)
      props.reload();

      
      
    
  
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <div className="main" style={{ marginBottom: "50px" }}>
      {console.log(bulletins)}
      <h2>
        Bulletin Board
        <button
          className="ui button blue large right floated"
          onClick={handleClickOpen}
          style={{width:'155px', backgroundColor:"rgba(26, 170, 255, 0.91)"}}
        >
          Insert
        </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogContent>
            <AddBulletinForm
              handleClose={handleClose}
              addBulletin={addBulletin}
            />
          </DialogContent>
        </Dialog>
      </h2>
      
      <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead style={{backgroundColor:"rgba(27, 109, 109, 0.1)"}}>
                <TableRow>
                  <TableCell align="center"  style={{maxWidth:'10px'}}/>
                  <TableCell align="center">
                    <h3>Item Name</h3>
                  </TableCell>
                  <TableCell align="center">
                    <h3>Quantity</h3>
                  </TableCell>
                  <TableCell align="center">
                    <h3>Added by</h3>
                  </TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
              
          {
              bulletins.map((bulletin,key)=>{
                return <BulletinCard bulletin={bulletin} clickhandler={markAsDone} />
              })
            }
      
                
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  );
};

export default BulletinBoard;
