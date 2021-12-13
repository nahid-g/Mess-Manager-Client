import React, { useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Container } from "semantic-ui-react";

import Layout from "../Layout";
import MemberCard from './MemberCard';



const Member=() =>{


    const [, token] = document.cookie.split("=");
    const [memberList, setMemberList] = useState([])

    const retrieveMemberList = async () => {
       
        const req = {
          token
        };
        const res = await axios.post("http://localhost:4004/member/show", req, {
          withCredentials: true,
        });
        console.log(res.data);
        
        return res.data;
      };
    
      const getMemberList = async () => {
        const memberlist = await retrieveMemberList();
        console.log(memberlist);
        if (memberlist) setMemberList(memberlist);
        else alert("server error");
    
        //console.log(todayMeal)
      };

      useEffect(()=>{
           getMemberList()
      },[])

    return (
        <Layout>
      <div>
        <div className="main">
          <div
            className="container"
            style={{ margin: "20px 300px 30px 150px", borderRadius: "1%" }}
          >
            

            <Container
              textAlign="center"
              style={{
                height: "60px",
                backgroundColor: "RGBA(27,109,109,0.10)",
              }}
            >
              <h2 style={{ paddingBottom: "10px" }}>Contacts</h2>
            </Container>

            <TableContainer component={Paper}>
              <Table >
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="left" /> */}
                    <TableCell align="center">
                      <h3>Name</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>Phone No</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>Email</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>Bazar Date</h3>
                    </TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>

                    {
                        memberList.length>0 && 
                        memberList.map((member,key)=>{
                            return <MemberCard member={member} />
                        })
                    }
                  
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Layout>
  
    )
}

export default Member
