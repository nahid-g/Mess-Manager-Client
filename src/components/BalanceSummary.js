import React from 'react'
import { Table, Container } from "semantic-ui-react";

import BalanceCard from './BalanceCard'


function BalanceSummary(props) {


    let balanceList = props.balancesummary.membersRefinedDetails;

  let c = 0;
  const renderBalanceSummary = balanceList.map((balance) => {
    c = c + 1;
    //console.log(c)
    return <BalanceCard balance={balance} id={c} />;
  });

    return (
    <div className="main" style={{}}>
        
        <Container
        textAlign="center"
        style={{ height: "60px", backgroundColor: "RGBA(27,109,109,0.10)" }}
      >
        <h2 style={{ paddingBottom: "10px" }}>
         Balance Summary
        </h2>
      </Container>

      <Table celled striped style={{marginTop:'-10px'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Paid</Table.HeaderCell>
            <Table.HeaderCell>Charged</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderBalanceSummary}</Table.Body>
      </Table>
    </div>
  );
        
}

export default BalanceSummary
