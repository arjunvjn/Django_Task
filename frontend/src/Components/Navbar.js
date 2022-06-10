import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar(val) {
  
  const nav=useNavigate()
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         
          </Typography>
         {val.data==="admin"?
          <Button color="inherit" onClick={()=> {axios.post('http://localhost:8000/api/logout/').then((res)=>nav('/')) }}>Logout</Button>:<Button color="inherit" onClick={()=> {console.log(val);nav('/')} }>SignIn</Button>} 
        </Toolbar>
      </AppBar>
    </Box>
  );
}