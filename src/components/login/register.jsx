import React, { useState } from "react";
import { useNavigate } from "react-router";
import loginImg from "../../login.svg";
import "./style.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";



export default function Register(props) {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({});
  let [messName, setMessName] = useState("")
  const [button, setButton] = useState(false)
  let navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();

    // const res= await axios.post("http://localhost:5002/signup",contact);
    // console.log(res); 

    //props.registerInfo(contact);
    // setContact({
    //   name: "",
    //   email: "",
    //   password: "",
    //   mobile: "",
    //   messID: "",
    //   role:"member"
    // });
 
    
  };

  // const handleJoin = async(e)=>{

  //   //e.preventDefault();

  //   const res= await axios.post("http://localhost:5002/signup",contact);
  //   console.log(res); 

    

   

    //props.registerInfo(contact);
    // setContact({
    //   name: "",
    //   email: "",
    //   password: "",
    //   mobile: "",
    //   messID: "",
    //   role:"member"
    // });
 
    // navigate("/");}

  
  
  const handleJoin = async(e)=>{

    console.log(contact) 
    
    const res= await axios.post("http://localhost:4004/signup",contact);

    setContact({
      name: "",
      email: "",
      password: "",
      mobile: "",
      messID: "",
      role:"member"
    });

    window.location.reload()

  }
  

  const handleCreateMess = async(e) => {
    setOpen(false);
    setButton(true)
    //console.log(messName)
    const req={
      messName
  }
  console.log(req);
    //const res = await api.post("http://localhost:5000/createmess",req)
    const res= await axios.post("http://localhost:4004/createmess",req);
    console.log(res.data) 

    setContact({...contact, messID:res.data.mID, role:"manager"});
    console.log(contact.messID)


  };


  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Register</div>
      <div className="content">
        {/* <div className="image">
            <img src={loginImg} />
          </div> */}
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="id">MessID</label>
            <input
              type="text"
              name="messID"
              value={contact.messID}
              onChange={(e) =>
                setContact({ ...contact, messID: e.target.value })
              }
              placeholder="messID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              placeholder="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={contact.password}
              onChange={(e) =>
                setContact({ ...contact, password: e.target.value })
              }
              placeholder="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile No</label>
            <input
              type="tel"
              name="mobile"
              value={contact.mobile}
              onChange={(e) =>
                setContact({ ...contact, mobile: e.target.value })
              }
              placeholder="mobile number"
            />
          </div>

          {/* <button type="submit" value = "submit" className="btn">
                    Join Mess
                </button> */}
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="success" onClick={handleJoin} >Join mess</Button>

            <Button
              disabled={button}
              variant="contained"
              
              onClick={()=>setOpen(true)}
            >
              Create Mess
            </Button>
          </Stack>
        </form>
      </div>


      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Create Mess</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a mess you need to type a mess name and we will provide you a unique id for your mess. 
          </DialogContentText>
          <input
              type="text"
              name="messName"
              value={messName} 
              onChange={(e) => setMessName( messName= e.target.value )}
              placeholder="mess name"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateMess} >Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
