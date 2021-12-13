import React from "react";
import { Table } from "semantic-ui-react";

const ProfileMealCard = (props) => {
  const { date, description, expense } = props.expense;
  //console.log(props.id);
  //console.log(props.meal.name);

  return (
    <Table.Row>
      <Table.Cell textAlign="center">{date}</Table.Cell>
      <Table.Cell textAlign="center">{description}</Table.Cell>
      <Table.Cell textAlign="center">{expense}</Table.Cell>
    </Table.Row>
  );
};

export default ProfileMealCard;
