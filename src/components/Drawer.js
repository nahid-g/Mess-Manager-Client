import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import EmailForm from "./EmailForm";
import Chat from "./Chat";

import io from "socket.io-client";

const drawerWidth = 200;
const socket = io.connect("http://localhost:3001");

export default function ClippedDrawer() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const room = currentUser.messID;
  const username = currentUser.name;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChatOpen = () => {
    socket.emit("join_room", room);
    setOpenChat(true)
  };
  const handleCloseChat = () => {
    setOpenChat(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: "RGBA(27,109,109,0.45)",
            //   opacity:"50%",
            color: "#2b3b52",
            height: "100%",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="right"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List style={{ margin: "40px 40px" }}>
            <ListItem
              button
              onClick={() => {
                navigate("/meals");
              }}
            >
              <h3>Meals</h3>
            </ListItem>
            <hr style={{ marginTop: "-15px" }} />
            <ListItem
              button
              onClick={() => {
                navigate("/expenses");
              }}
              style={{ marginTop: "-5px" }}
            >
              <h3>Expenses</h3>
            </ListItem>
            <hr style={{ marginTop: "-15px" }} />
            <ListItem
              button
              onClick={() => {
                navigate("/schedule");
              }}
              style={{ marginTop: "-5px" }}
            >
              <h3>Schedules</h3>
            </ListItem>
            <hr style={{ marginTop: "-15px" }} />
            <ListItem
              button
              onClick={() => {
                navigate("/members");
              }}
              style={{ marginTop: "-5px" }}
            >
              <h3>Contacts</h3>
            </ListItem>
            <hr style={{ marginTop: "-15px" }} />
            <ListItem
              button
              onClick={() => {
                navigate("/statistics");
              }}
              style={{ marginTop: "-5px" }}
            >
              <h3>Statistics</h3>
            </ListItem>
            <hr style={{ marginTop: "-10px" }} />

            <hr style={{ marginTop: "-15px" }} />

            {/* <ListItem button onClick={()=> {}} style={{marginTop:'-5px'}}> 
              <h3>Bulletin</h3>
            </ListItem> */}
          </List>
        </Box>
        <div
          style={{
            marginTop: "150px",
            marginBottom: "auto",
            textAlign: "center",
          }}
        >
          {/* style={{backgroundColor:"rgba(6, 131, 90, 1)"}} */}
          <Button  variant="outlined" onClick={handleClickOpen} onFocusVisible endIcon={<EmailIcon />}>
            <h3 style={{ marginTop: "8px", width: "70px", height:'15px' }}>Invite</h3>
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Send Invitation</DialogTitle>
            <DialogContent>
              <DialogContentText>Add email</DialogContentText>

              <EmailForm handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
        <div
          style={{
            marginTop: "15px",
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          {/* style={{backgroundColor:"rgba(6, 131, 90, 1)"}} */}
          <Button  variant="contained" onClick={handleChatOpen} onFocusVisible endIcon={<ChatIcon />}>
            <h3 style={{ marginTop: "8px", width: "70px", height:'15px' }}>Chat</h3>
          </Button>
          <Dialog open={openChat} onClose={handleCloseChat}>
            
            <DialogContent>
            <Chat socket={socket} username={username} room={room} />
            </DialogContent>
          </Dialog>
        </div>
      </Drawer>
    </Box>
  );
}
