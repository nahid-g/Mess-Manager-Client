import React from "react";
import { Table } from "semantic-ui-react";

const MealCard = (props) => {
  const { name, totalMeal } = props.meal;
  //console.log(props.id);
  //console.log(props.meal.name);

  return (
    <Table.Row>
      <Table.Cell textAlign="center">{props.id}</Table.Cell>
      <Table.Cell textAlign="center">{name}</Table.Cell>
      <Table.Cell textAlign="center">{totalMeal}</Table.Cell>
    </Table.Row>
  );
};

export default MealCard;
