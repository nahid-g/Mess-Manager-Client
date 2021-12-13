import React, { useEffect, useState } from "react";
import {
  Grid,
  Image,
  Container,
  Card,
  Segment,
  Icon,
  Table,
} from "semantic-ui-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import UserProfile from "react-user-profile";
import Layout from "../Layout";
import axios from "axios";
import ProfileMealCard from "./ProfileMealCard";
import ProfileExpenseCard from "./ProfileExpenseCard";

const Profile = () => {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  const photo =
    "https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599";
  const userName = "Harvey Specter";
  const location = "New York, USA";

  // const comments = [
  //   {
  //     id: "1",
  //     photo:
  //       "https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599",
  //     userName: "Mike Ross",
  //     content:
  //       "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. ",
  //     createdAt: 1543858000000,
  //   },
  // ];

  const [, token] = document.cookie.split("=");
  let [data, setData] = useState({});
  // data = {};

  const retrieveData = async () => {
    const req = {
      headers: {
        token,
      },
    };
    const res = await axios.get("http://localhost:4004/profile/show", req, {
      withCredentials: true,
    });
    console.log(res.data);

    return res.data;
  };

  const getData = async () => {
    const datA = await retrieveData();
    if (datA) setData(datA);
    else alert("server Error");

    console.log(data);
  };

  useEffect(() => {
    getData();
    console.log(currentUser);
  }, []);

  return (
    <Layout>
      {data.hasOwnProperty("totalMeal") && (
        <div
          className="container"
          style={{ margin: "20px 300px 30px 150px", borderRadius: "1%" }}
        >
          <Container>
            <Grid columns={2}>
              <Grid.Row stretched>
                <Grid.Column>
                  <Card>
                    <Image
                      src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                      wrapped
                      ui={false}
                    />
                    <Card.Content>
                      <Card.Header>{currentUser.name}</Card.Header>
                      <Card.Meta>{currentUser.role}</Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>

                <Grid.Column>
                  <Grid.Column>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="Bazar-Date"
                        style={{ backgroundColor: "" }}
                      >
                        <Typography variant="h5">Bazar Date</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="p">
                          I need to shop on {currentUser.schedule}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid.Column>
                  <Grid.Column>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: "" }}
                      >
                        <Typography variant="h5">Total meal</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="p">
                          I have consumed {data.totalMeal} meals
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid.Column>
                  <Grid.Column>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: "" }}
                      >
                        <Typography variant="h5">Total expense</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="p">
                          I have paid {currentUser.expense} tk
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid.Column>
                  <Grid.Column>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: "" }}
                      >
                        <Typography variant="h5">Payment</Typography>
                      </AccordionSummary>

                      {/* {currentUser.payments.map((payment, index) => 
                       ( */}
                      {currentUser.payments[0].moneyFrom === currentUser.name ? (
                        <AccordionDetails>
                          <Typography variant="p">
                            I have to pay {currentUser.payments[0].moneyTo}{" "}
                            {currentUser.payments[0].amount.toFixed(2)} tk
                          </Typography>
                        </AccordionDetails>
                      ) : (
                        <AccordionDetails>
                          <Typography variant="p">
                            {currentUser.payments[0].moneyFrom} will pay you{" "}
                            {currentUser.payments[0].amount.toFixed(2)} tk
                          </Typography>
                        </AccordionDetails>
                      )}
                      {/* })} */}

                      <AccordionDetails>
                        {/* <Typography variant="p"> */}
                        {/* {currentUser.payments[0].moneyFrom} will pay you {currentUser.payments[0].amount.toFixed(2)} tk 
                            </Typography>
                            <Typography variant="p">
                            {currentUser.payments[0].moneyFrom} will pay you {currentUser.payments[0].amount.toFixed(2)} tk 
                            </Typography> */}
                        {currentUser.payments.map((payment, index) => {
                          // console.log(payment.moneyFrom)
                          <p>
                            {payment.moneyFrom} will pay you{" "}
                            {payment.amount.toFixed(2)} tk{" "}
                          </p>;

                          // <Typography variant="p">
                          //   {payment.moneyFrom} will pay you {payment.amount.toFixed(2)} tk
                          //   </Typography>
                          // (payment.moneyFrom===currentUser.name) ?
                          // <Typography variant="p">
                          // I have to pay {payment.moneyTo} {payment.amount.toFixed(2)} tk
                          // </Typography> :
                          //  <Typography variant="p">
                          //  {payment.moneyFrom} will pay you {payment.amount.toFixed(2)} tk
                          //  </Typography>
                        })}
                      </AccordionDetails>
                    </Accordion>
                  </Grid.Column>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

          <div className="main" style={{}}>
            <Container
              textAlign="center"
              style={{
                height: "60px",
                backgroundColor: "RGBA(27,109,109,0.10)",
              }}
            >
              <h2 style={{ paddingBottom: "10px" }}>My meals</h2>
            </Container>

            <Table celled striped style={{ marginTop: "-10px" }}>
              <Table.Header>
                <Table.Row>
                  {/* <Table.HeaderCell textAlign="center">Id</Table.HeaderCell> */}
                  <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Breakfast
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Lunch</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Dinner</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.myMeal.map((meal) => {
                  return <ProfileMealCard meal={meal} />;
                })}
              </Table.Body>
            </Table>
          </div>

          <hr style={{ marginTop: "40px" }} />
          <hr style={{ marginBottom: "40px" }} />

          <div className="main" style={{ marginTop: "0px" }}>
            <Container
              textAlign="center"
              style={{
                height: "60px",
                backgroundColor: "RGBA(27,109,109,0.10)",
              }}
            >
              <h2 style={{ paddingBottom: "10px" }}>My expenses</h2>
            </Container>

            <Table celled striped style={{ marginTop: "-10px" }}>
              <Table.Header>
                <Table.Row>
                  {/* <Table.HeaderCell textAlign="center">Id</Table.HeaderCell> */}
                  <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Description
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Expense
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.expenses.map((expense) => {
                  return <ProfileExpenseCard expense={expense} />;
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
