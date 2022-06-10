import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";




// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function BookTable(val) {
    const nav=useNavigate()
    let  [rows,setrows]=React.useState()
    let getdata=async()=> {
        let data=await axios.get('http://localhost:8000/api/book/')
        console.log(data)
        setrows(data.data)
    }
  React.useEffect(()=>{
      getdata()
  },[])
  return (
    <div>
        <Button variant="contained" color="success" class="text-center" align="right" onClick={()=> nav('/addbook')}>
        + Add Book
        </Button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Name Of Book</TableCell>
                <TableCell align="right">Author Name</TableCell>
                <TableCell align="right">Price</TableCell>
                {val.data==='admin'?<>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell></>:
                <></>
                }
                
            </TableRow>
            </TableHead>
            <TableBody>
            {rows && rows.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                {val.data==='admin'?
                <>
                <TableCell align="right">
                    <Button variant="contained" color="success" onClick={()=> nav(`/editbook/${row.id}`)}>
                        Edit
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button variant="outlined" color="error"onClick={()=> {axios.delete(`http://localhost:8000/api/book/${row.id}/`); getdata()}}>
                        Delete
                    </Button>
                </TableCell>
                </>:
                <></>
                }
                
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}