import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import Button from "@mui/material/Button";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MemberDelete() {
  const [, token] = document.cookie.split("=");
  const Navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const clickHandler = async (id) => {
    const req = {
      id,
    };
    const res = await axios.post("http://localhost:4004/member/delete", req, {
      withCredentials: true,
    });
    console.log(res.data);
    getMember();
  };

  const getMember = async () => {
    const req = {
      token,
    };
    const res = await axios.post("http://localhost:4004/member/show", req, {
      withCredentials: true,
    });
    console.log(res.data);
    setMembers(res.data);
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <div>
      <Dialog open={true}>
        <DialogTitle style={{ textAlign: "center", justifyContent: "center" }}>
          <b> End Month </b>
        </DialogTitle>

        <DialogContent style={{ minHeight: "150px", minWidth: "300px" }}>
          <TableContainer component={paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "large" }}>
                    <b>Name</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => {
                    if(member.role !== 'manager'){
                  return (
                    <TableRow>
                      <TableCell
                        textAlign="center"
                        style={{ fontSize: "large" }}
                      >
                        {member.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ backgroundColor: "rgba(0, 20, 52, 0.5)" }}
                      >
                        <IconButton
                          color="error"
                          fontSize="large"
                          onClick={() => clickHandler(member._id)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
}})}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogActions
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              autoFocus
              onClick={() => Navigate("/statistics")}
            >
              Done
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MemberDelete;
