import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Container } from "semantic-ui-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
 

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Layout from "../Layout";
import TodayMealCard from "./TodayMealCard";
import AddMealForm from "./AddMealform";
import axios from "axios";
import Grid from "@mui/material/Grid";

function TodayMeal(props) {

  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const [, token] = document.cookie.split("=");

 
  const [todayMeal, setTodayMeal] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const retrieveMeal = async () => {
    // console.log(value.toLocaleDateString())
    // console.log(token)
    // console.log(date)
    const req = {
      token,
      date,
    };
    const res = await axios.post("http://localhost:4004/meal/show", req, {
      withCredentials: true,
    });
    console.log(res.data);
    const { dailyList } = res.data;
    console.log(dailyList);
    return dailyList;
  };

  const getTodayMealList = async () => {
    const todaymeal = await retrieveMeal();
    console.log(todaymeal);
    if (todaymeal) setTodayMeal(todaymeal);
    else alert("server error");

    //console.log(todayMeal)
  };

  

  const handleChange = (newValue) => {
    console.log(newValue.toLocaleDateString());
    setDate(newValue.toLocaleDateString());
    //console.log(date)
    // setDate(value.toLocaleDateString())
  };

  //add-meal

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    ///////////////////////////////  send request to server to add\\\\\\\\\\\\\\
    // const date = value.toLocaleDateString()

    
    const dailyList = todayMeal;
    //console.log(dailyList)
    const req = {
      token,
      date,
      dailyList,
    };
    console.log(req);
    const res = await axios.post("http://localhost:4004/meal/add", req, {
      withCredentials: true,
    });
    console.log(res.data);
    if (res.data.error) {
      const res = await axios.patch("http://localhost:4004/meal/update", req, {
        withCredentials: true,
      });
    }
     console.log(res);
    //getTodayMealList()
    handleClose();
  };

  /////////   use-effect  \\\\\\\\\

 

  useEffect(() => {
    //console.log(date);
    getTodayMealList();
    //console.log(currentUser.role)
  }, []);

  useEffect(() => {
    //console.log(date);
    getTodayMealList();
  }, [date]);

 

  return (
    <Layout>
      <div>
        <div className="main">
          <div
            className="container"
            style={{ margin: "20px 300px 30px 150px", borderRadius: "1%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                
                  <div style={{ width: "250px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Date desktop"
                          inputFormat="MM/dd/yyyy"
                          value={date}
                          onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                
              </Grid>
              <Grid item xs={4}container justifyContent="flex-end">
                
                  <div>
                    <Button  variant="contained" onClick={handleClickOpen}   style={{display: ((currentUser.role === 'member') ? 'none' : 'block') }}>
                      <h4 style={{ marginTop: "10px", width: "120px" }}>Add</h4>
                    </Button>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      fullWidth={true}
                      maxWidth={"md"}
                      // style={{zIndex:'2000'}}
                      // maxHight={'sm'}
                    >
                      <DialogContent>
                        <div style={{ width: "250px" }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="MM/dd/yyyy"
                                value={date}
                                onChange={handleChange}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </div>

                        <TableContainer component={Paper}>
                          <Table aria-label="collapsible table">
                            <TableHead>
                              <TableRow>
                                {/* <TableCell align="left" /> */}
                                <TableCell align="center">
                                  <h3>Name</h3>
                                </TableCell>
                                <TableCell align="center">
                                  <h3>Breakfast</h3>
                                </TableCell>
                                <TableCell align="center">
                                  <h3>Lunch</h3>
                                </TableCell>
                                <TableCell align="center">
                                  <h3>Dinner</h3>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {todayMeal.length > 0 &&
                                todayMeal.map((mem) => {
                                  return <AddMealForm mem={mem} />;
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          size="medium"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                
              </Grid>
            </Grid>

            <hr />
            <hr />
            <hr />

            <Container
              textAlign="center"
              style={{
                height: "60px",
                backgroundColor: "RGBA(27,109,109,0.10)",
              }}
            >
              <h2 style={{ paddingBottom: "10px" }}>Meal list by Date</h2>
            </Container>

            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="left" /> */}
                    <TableCell align="center">
                      <h3>Name</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>Breakfast</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>Lunch</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>Dinner</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayMeal.length > 0 &&
                    todayMeal.map((mem) => {
                      return <TodayMealCard mem={mem} />;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default TodayMeal;
