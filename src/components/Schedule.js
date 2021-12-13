import React, { Component, useState, useEffect } from "react";
import { Form, Radio } from "semantic-ui-react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import Layout from "../Layout";
import AddScheduleForm from "./AddScheduleForm";
import axios from "axios";
import { ScheduleSend } from "@mui/icons-material";
import { hr } from "date-fns/locale";

const Schedule = () => {
  const [, token] = document.cookie.split("=");
  const [schedules, setSchedules] = useState([]);
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const [state, setState] = useState("");

  const handlechange = (e, { value }) => {
    setState(value);
  };

  const handleSet = async() => {
    const req = {
      token,
      schedule: state,
    };
    console.log(req);
    const res = await axios.post("http://localhost:4004/schedule/set", req, {
      withCredentials: true,
    });
    console.log(res.data);
    getSchedule()
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const req = {
      token,
      schedule: date,
    };
    console.log(req);
    const res = await axios.post("http://localhost:4004/schedule/create", req, {
      withCredentials: true,
    });
    console.log(res.data);

    getSchedule();

    handleClose();
  };

  const [date, setDate] = useState(new Date().toLocaleDateString());

  const handleChange = (newValue) => {
    console.log(newValue.toLocaleDateString());
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  setDate(newValue.toLocaleDateString());
    //console.log(date)
    // setDate(value.toLocaleDateString())
  };

  const retrieveSchedule = async () => {
    const req = {
      token,
    };

    const res = await axios.post("http://localhost:4004/schedule/show", req, {
      withCredentials: true,
    });
    console.log(res.data);

    return res.data;
  };

  const getSchedule = async () => {
    const sch = await retrieveSchedule();
    console.log(sch.schedules);
    if (sch) setSchedules(sch.schedules);
    else alert("server is busy");
  };

  useEffect(() => {
    getSchedule();
    console.log(schedules);
  }, []);

  //   useEffect(() => {

  // }, [date])

  return (
    <Layout>
      <div
        className="container"
        style={{ margin: "20px 300px 30px 150px", borderRadius: "1%" }}
      >
        <div className="schedule-container"style={{justifyContent:'center',marginTop:'auto',
    marginBottom:'auto',
    textAlign:'center'}}>

        <div >
          <Button variant="contained" onClick={handleClickOpen} disabled={currentUser.role === 'member'}>
            <h5 style={{ marginTop: "10px", width: "120px" }}>
              Insert schedule
            </h5>
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Pick a date</DialogTitle>
            <DialogContent>
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
                <Button
                  variant="contained"
                  style={{ marginTop: "10px" }}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

       

        {/* <div>
              {
                  schedules.map((schedule)=>{

                  })
              }
          </div> */}
        {schedules.length > 0 && 
        <div>
           <hr/>
           <hr/>
          <Form>

            {schedules.map((sch) => {
              {console.log(sch)}
              return (
                <Form.Field>
                  <Radio
                    label={new Date(sch.schedule).toDateString()}
                    name="radioGroup"
                    value={sch.schedule}
                    checked={state === sch.schedule}
                    onChange={handlechange}
                    disabled={sch.holderName}
                  />
                </Form.Field>
              );
            })}
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={handleSet}
            >
              Set Schedule
            </Button>
          </Form>
          </div>
         
        }
         </div>
      </div>
    </Layout>
  );
};

export default Schedule;
