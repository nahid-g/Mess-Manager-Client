import React from "react";
import { Table } from "semantic-ui-react";

const ProfileMealCard = (props) => {
  const { date, myDailyList } = props.meal;
  //console.log(props.id);
  //console.log(props.meal.name);

  return (
    <Table.Row>
      <Table.Cell textAlign="center">{date}</Table.Cell>
      <Table.Cell textAlign="center">{myDailyList[0].breakfast}</Table.Cell>
      <Table.Cell textAlign="center">{myDailyList[0].lunch}</Table.Cell>
      <Table.Cell textAlign="center">{myDailyList[0].dinner}</Table.Cell>
    </Table.Row>
  );
};

export default ProfileMealCard;
