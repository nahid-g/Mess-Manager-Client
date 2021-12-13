import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Layout from "../Layout";
import ExpenseCard from "./ExpenseCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import AddExpenseForm from "./AddExpenseForm";
import axios from "axios";

function Expenses(props) {
  

  let c = 0;
 

  ////////////  add-expense  \\\\\\\\\\\\
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 ////////////////   add-expense request \\\\\\\\\\\\\\\\
  const addExpense = async (ex) => {
    const description = ex.desc;
    const expense = ex.paid;

    const req = {
      token,
      description,
      expense,
    };
    console.log(req);

    const res = await axios.post("http://localhost:4004/expense/add", req, {
      withCredentials: true,
    });
    console.log(res);

    getExpenses();
    //window.location.reload()

   
  };

  //////////////////////\\\\// retrieve expense \\\\\\\\\\\\\\\\\\
  const [expenses, setExpenses] = useState([]);
  const [, token] = document.cookie.split("=");

  const retrieveExpenses = async () => {
    const res = await axios.post(
      "http://localhost:4004/expense/show",
      { token },
      { withCredentials: true }
    );
    console.log(res.data);
    return res.data;
  };

  const getExpenses = async () => {
    const expenses = await retrieveExpenses();
    console.log(expenses.expenses);
    if (expenses) setExpenses(expenses.expenses);
    else alert("server is busy");
  };

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  useEffect(() => {
    console.log("in expenses.js");

    getExpenses();
  }, []);

  return (
    <Layout>
      <div className="main">
        <div
          className="container"
          style={{ margin: "20px 300px 30px 150px", borderRadius: "1%" }}
        >
          <div>
            <Button variant="contained"  onClick={handleClickOpen} >
              <h3 style={{marginTop:'10px', width:'120px'}}>Add</h3></Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Expense</DialogTitle>
              <DialogContent>
                <DialogContentText>Add expense</DialogContentText>

                <AddExpenseForm
                  handleClose={handleClose}
                  addExpense={addExpense}
                />
              </DialogContent>
            </Dialog>
          </div>

          <Container
            textAlign="center"
            style={{ height: "60px", backgroundColor: "RGBA(27,109,109,0.10)" }}
          >
            <h2 style={{ paddingBottom: "10px" }}>Total Expenses</h2>
          </Container>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <h3>ID</h3>
                  </TableCell>
                  <TableCell align="right">
                    <h3>Name</h3>
                  </TableCell>
                  <TableCell align="right">
                    <h3>Expense</h3>
                  </TableCell>
                  <TableCell align="right">
                    <h3>Date</h3>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.length > 0 &&
                  expenses.map((expense) => {
                    c = c + 1;
                    return <ExpenseCard expense={expense} id={c} />;
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
}

export default Expenses;
