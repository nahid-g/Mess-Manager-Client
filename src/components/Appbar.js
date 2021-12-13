import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate } from 'react-router-dom'
import axios from 'axios'

import logo from './images/logo.png'




const pages = ['Meal', 'Member', 'Overview'];
const settings = ['Profile', 'Logout'];
let c=false;
let d = false

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const Navigate = useNavigate();

  //log out handler
  const handleLogout = async(e)=>{
    const [, token] = document.cookie.split("=");
    console.log(token)
    const res = await axios.post(
      "http://localhost:4004/signout",
      {token},
      { withCredentials: true }
    );

    window.localStorage.removeItem("currentUser")

    Navigate("/");
    
  }

  const handleOpenNavMenu = (event) => {
    if(!d){
      setAnchorElNav(event.currentTarget)
      d=true
     }else{
       setAnchorElNav(null);
       d=false
     }
  };
  const handleOpenUserMenu = (event) => {
    if(!c){
     setAnchorElUser(event.currentTarget)
     c=true
    }else{
      setAnchorElUser(null);
      c=false
    }

  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogoClick=()=>{
      
  }
  



  return (
    <AppBar position="sticky" style={{zIndex:1400, backgroundColor:"#1B6D6D",height:'70px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            style={{marginRight:"400px"}}
            onClick={()=> Navigate('/home')}
            
          >
              Logo
            
          </Typography> */}
          <Box style={{marginRight:"400px"}}
            component="img"
            sx={{
            height: 84,
            width:80
            }}
            alt="Your logo."
            src={logo}
            onClick={()=> Navigate('/home')}
        />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>Pick
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={()=>{ Navigate('/meals')}}>
                  <Typography textAlign="center">Meal</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{ Navigate('/expenses')}}>
                  <Typography textAlign="center">Expense</Typography>
                </MenuItem>
                {/* <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Total Expense</Typography>
                </MenuItem> */}
              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            onClick={()=> Navigate('/home')}
          >
            
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          <Button
                onClick={()=>{ Navigate('/meals')}}
                sx={{ my: 1, color: 'white', display: 'block' }}
                 
              >
                <h4 >Meal</h4>
              </Button>
          
              <Button
                onClick={()=>{ Navigate('/expenses')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <h4 >Expense</h4>
              </Button>
              
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={()=> Navigate('/profile')}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              <MenuItem onClick={handleLogout}>
                
                  <Typography textAlign="center">Log out</Typography>

                </MenuItem> 
              </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
