import React from 'react'
import { Table } from "semantic-ui-react";


function BalanceCard(props) {
    const { name,paid,charged,balance } = props.balance;
  //console.log(props.id);
  //console.log(props.meal.name);

  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{paid}</Table.Cell>
      <Table.Cell>{charged.toFixed(2)}</Table.Cell>
      <Table.Cell>{balance.toFixed(2)}</Table.Cell>
    </Table.Row>
  );
}

export default BalanceCard
