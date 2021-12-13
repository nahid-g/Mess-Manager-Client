import React, { useState } from "react";
import MealCard from "./MealCard";
import { Table, Container } from "semantic-ui-react";

const MealSummary = (props) => { 
  //console.log(props.mealsummary);

  let mealList = props.mealsummary.membersRefinedDetails;
  let totalMeal = props.mealsummary.totalMeal;

  let c = 0;
  const renderMealSummary = mealList.map((meal) => {
    c = c + 1;
    //console.log(c)
    return <MealCard meal={meal} id={c} />;
  });

  return (
    <div className="main" style={{}}>
      <Container
        textAlign="center"
        style={{ height: "60px", backgroundColor: "RGBA(27,109,109,0.10)" }}
      >
        <h2 style={{paddingBottom:'10px' }}>
          Total meals : {totalMeal}
        </h2>
      </Container>

      <Table celled striped style={{marginTop:'-10px'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Id</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Meals</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderMealSummary}</Table.Body>
      </Table>
    </div>
  );
};

export default MealSummary;
