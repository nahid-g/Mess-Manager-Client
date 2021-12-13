import React, { useState } from "react";
import loginImg from "../../login.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [contact, setContact] = useState({});
  const [user,setUser]= useState({})
  let navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();

    
    console.log(contact);

    const res= await axios.post("http://localhost:4004/signin",contact,{withCredentials:true});
    // const data = res.user
     
    //setUser(res.data.user)

    console.log(res.data);
    props.loginInfo(res.data)

    window.localStorage.setItem("currentUser", JSON.stringify(res.data))

    setContact({
      email: "",
      password: "",
    });
   
 
    navigate("/home");
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={(e) => {
                setContact({ ...contact, email: e.target.value });
              }}
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={contact.password}
              onChange={(e) => {
                setContact({ ...contact, password: e.target.value });
              }}
              placeholder="password"
            />
          </div>
          <button type="submit" value="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// export default class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name:"",
//       pass:""

//     }
//     this.submitHandler=this.submitHandler.bind(this);
//     this.handleName=this.handleName.bind(this);
//     this.handlePass=this.handlePass.bind(this)
//   }

//   submitHandler=(e)=>{
//     e.preventDefault();
//     console.log(this.props)
//     this.props.loginInfo(this.state);
//     this.setState({
//       name:"",
//       pass:""
//     })

//     console.log(this.props)

//   }

//   handleName(event) {
//     console.log(event.target.value)
//     this.setState({...this.state, name: event.target.value});
//   }

//   handlePass(event) {
//     this.setState({...this.state, pass: event.target.value});
//   }

//   render() {

//     return (
//       <div className="base-container" ref={this.props.containerRef}>
//         <div className="header">Login</div>
//         <div className="content">
//           <div className="image">
//             <img src={loginImg} />
//           </div>
//           <form className="form" onSubmit={this.submitHandler}>
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input type="text" name="username" value={this.state.name} onChange={this.handleName} placeholder="username" />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input type="password" name="password" value={this.state.pass} onChange={this.handlePass} placeholder="password" />
//             </div>
//             <button type="submit" value = "submit" className="btn">
//                 Login
//             </button>
//           </form>
//         </div>
//         {/* <div className="footer">
//         <button type="button" className="btn">
//             Login
//           </button>
//         </div> */}
//       </div>
//     );
//   }
// }
