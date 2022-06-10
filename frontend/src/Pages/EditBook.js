import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate,useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function EditBook() {
let param= useParams()
  let [name,setName]=React.useState()
  let [author,setAuthor]=React.useState()
  let [price,setPrice]=React.useState()
  let getbook=async()=>{
      console.log(param);
      let books=await axios.get(`http://localhost:8000/api/book/${param.id}/`)
      setName(books.data.name)
      setAuthor(books.data.author)
      setPrice(books.data.price)

  }
  React.useEffect(()=>{
      getbook()
  },[])
  const nav=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      author: data.get('author'),
      price: data.get('price')
    });
    axios.put(`http://localhost:8000/api/book/${param.id}/`,{
        name,
        author,
        price
    })
    nav('/home')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar> */}
          <Typography component="h1" variant="h5">
           Edit Book
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name of Book"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="Nmae of Author"
              value={author}
              type="author"
              id="author"
              autoComplete="author"
              onChange={(e)=>setAuthor(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              value={price}
              type="price"
              id="price"
              autoComplete="price"
              onChange={(e)=>setPrice(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}