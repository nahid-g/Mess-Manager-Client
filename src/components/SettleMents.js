import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

function SettleMents({balanceSortOut}) {

  console.log(balanceSortOut)  

  return (
    <div className="main" s>
      <h2 style={{ textAlign: "center" }}>Balance Sort Out</h2>

      {
        balanceSortOut.length>0 && balanceSortOut.map((member)=>{
          return(
            <div>
            <Card >
            <CardHeader
              avatar={<Avatar height={24} width={24} style={{marginLeft:'50px'}} alt="Remy Sharp" src="" />}
              action={<h2 style={{ paddingTop: "20px" , marginRight:'70px'}}>{parseFloat(member.amount).toFixed(2)}</h2>}
              titleTypographyProps={{ variant: "h5" }}
              subheaderTypographyProps={{ variant: "h6" }}
              title={member.moneyFrom}
              subheader={` should pay ${member.moneyTo} `}
            />
            
          </Card>
          <hr />
          </div>
          
          )
        })
      }

      
    </div>
  );
}

export default SettleMents;
