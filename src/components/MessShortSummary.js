import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function MessShortSummary(props) {

  const {messName, mealCost, totalExpense} = props.summary;
  
  // const messName = 
  // const mealCost = 52.45;
  // const totalExpense = 2300;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom:"20px" }}>

    <Card
      sx={{
        minWidth: 500,
        display:'flex',
        justifyContent: "center",
        backgroundColor: "RGBA(27,109,109,0.10)",
        borderRadius: 5
      }}
      className="div"
    >
        <CardContent>
            <div style={{ display: "flex", justifyContent: "center", color:"red", fontSize:24}} >
               <b> {messName} </b>
            </div>
          <div style={{display:"flex",justifyContent:"center"}}>
            <b> {parseFloat(mealCost).toFixed(2)}</b> &nbsp;TK/per meal
          </div>
          <div style={{display:"flex",justifyContent:"center"}}> Total expenses : {totalExpense}</div>
        </CardContent>
    
    </Card>
    </div>
  );
}

export default MessShortSummary;
