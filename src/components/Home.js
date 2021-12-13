import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../Layout";
import MessShortSummary from "./MessShortSummary";
import MealSummary from "./MealSummary";
import axios from "axios";
import "./Home.css";
import BalanceSummary from "./BalanceSummary";
import FloatingActionButton from "./FloatingActionButton";
import SettleMents from "./SettleMents";
import Button from "@mui/material/Button";
import BulletinBoard from "./BulletinBoard";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import paper from "@mui/material/Paper";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Home = () => {
  const [, token] = document.cookie.split("=");
  const Navigate  = useNavigate()
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const [summary, setSummary] = useState({});
  const [mealsummary, setMealSummary] = useState({});
  const [balancesummary, setBalanceSummary] = useState({});
  const [balanceSortOut, setBalanceSortOut] = useState({});
  const [bulletinList, setBulletinList] = useState([]);

  const retrieveMSS = async () => {
    const res = await axios.post(
      "http://localhost:4004/summary/short",
      { token },
      { withCredentials: true }
    );
    //console.log(res.data);
    return res.data;
  };
  const retrieveMealSummary = async () => {
    const res = await axios.post(
      "http://localhost:4004/summary/meal",
      { token },
      { withCredentials: true }
    );
    //console.log(res.data);
    return res.data;
  };

  const retrieveBalanceSummary = async () => {
    const res = await axios.post(
      "http://localhost:4004/summary/balance",
      { token },
      { withCredentials: true }
    );
    //console.log(res.data);
    return res.data;
  };

  const retrieveBalanceSortOut = async () => {
    const res = await axios.post(
      "http://localhost:4004/settle/",
      { token },
      { withCredentials: true }
    );
    console.log(res.data);
    console.log(typeof res.data);
    return res.data;
  };
  const retrieveBulletinBoard = async () => {
    const res = await axios.post(
      "http://localhost:4004/bulletin/show",
      { token },
      { withCredentials: true }
    );
    console.log(res.data);
    return res.data;
  };

  const getShortSummary = async () => {
    const shortSummary = await retrieveMSS();
    if (shortSummary) setSummary(shortSummary);
    else alert("server is busy");
  };

  const getMealSummary = async () => {
    const mealSummary = await retrieveMealSummary();
    console.log(mealSummary);
    if (mealSummary) setMealSummary(mealSummary);
    else alert("server is busy");
  };

  const getBalanceSummary = async () => {
    const balanceSummary = await retrieveBalanceSummary();
    console.log(balanceSummary);
    if (balanceSummary) setBalanceSummary(balanceSummary);
    else alert("server is busy");
  };

  const getBalanceSortOut = async () => {
    const balancesortout = await retrieveBalanceSortOut();
    console.log(balancesortout);
    if (balancesortout) setBalanceSortOut(balancesortout);
    else alert("server is busy");
  };

  const getBulletinBoard = async () => {
    const bulletinboard = await retrieveBulletinBoard();
    console.log(bulletinboard);
    if (bulletinboard) setBulletinList(bulletinboard.bulletins);
    else alert("server is busy");
  };

  useEffect(() => {
    getShortSummary();
    getMealSummary();
    getBalanceSummary();
    getBalanceSortOut();
    getBulletinBoard();
    console.log(bulletinList);
  }, []);

  useEffect(() => {
    console.log(bulletinList);
  }, [bulletinList]);

  //////////////////////////  End Month \\\\\\\\\\\\\

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const endMonth = async () => {
    console.log(balanceSortOut);
    const settleObject = balanceSortOut;

    const req = {
      settleObject,
    };
    console.log(req);
    const res = await axios.post("http://localhost:4004/payment/set", req, {
      withCredentials: true,
    });

    console.log(res.data);

    if (res.data.result === "sucess") {
      const req = {};
      const res = await axios.post("http://localhost:4004/endmonth/", req, {
        withCredentials: true,
      });
      console.log(res.data);
    }

    handleClose();

    Navigate('/deletemember')

    
  };

  return (
    <Layout>
      <div>
        <div
          className="container"
          style={{ margin: "20px 250px 20px 30px", borderRadius: "1%" }}
        >
          {summary && <MessShortSummary summary={summary} />}
          {/* {bulletinList.length > 0 && ( */}
          <BulletinBoard bulletins={bulletinList} reload={getBulletinBoard} />
          {/* )} */}

          <div className="meal">
            {mealsummary.hasOwnProperty("membersRefinedDetails") && (
              <MealSummary mealsummary={mealsummary} />
            )}
          </div>

          <hr />
          <hr />

          {balancesummary.hasOwnProperty("membersRefinedDetails") && (
            <BalanceSummary balancesummary={balancesummary} />
          )}

          {balanceSortOut.length > 0 && (
            <SettleMents balanceSortOut={balanceSortOut} />
          )}

          {/* <button style={{backgroundColor:'red', color:'white', size}}>End-Month</button> */}
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              size="large"
              disabled={currentUser.role === 'member'}
              style={{
                width: "250px",
                height: "70px",
                backgroundColor: "red",
                paddingTop: "25px",
              }}
            >
              <h3>End-Month</h3>
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                End Month
              </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ height: "50px" }}>
                  <b style={{ color: "red" }}>
                    {" "}
                    Do you really want to end this month now ??
                  </b>
                  {"\n"}
                  <p style={{ color: "red" }}>
                    This will remove all existing data of current month
                  </p>
                </DialogContentText>
                <DialogActions
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  <Button variant="contained" autoFocus onClick={handleClose}>
                    Disagree
                  </Button>
                  <Button variant="contained" autoFocus onClick={endMonth}>
                    Agree
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </div>
          {/* <FloatingActionButton /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
