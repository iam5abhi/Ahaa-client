import React,{useState,useEffect} from 'react'
import BaseUrl from '../config/BaseUrl'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const MenuItemlist =()=>{
    const [menuItem,setmenuItem] =useState('')
    const [loading,setloading] =useState(true)


    useEffect(() => {
        axios.get(`${BaseUrl.url}/api/v1/lisOffood`)
       .then((res)=>{
           console.log(res.data)
           setmenuItem(res.data.food)
           setloading(false)
       })
       .catch(err=>{
           console.log(err.message)
       })
    },[]);

      
    if(loading){
        return(
            <div>Loading......</div>
        )
    }

    return(
        <>
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                            <TableRow>
                                <TableCell>MenuItemId</TableCell>
                                <TableCell align="right">MenuItemName</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Food Category</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Service Tax</TableCell>
                                <TableCell align="right">Toatl Amount</TableCell>
                            </TableRow>
                   </TableHead>

                    <TableBody>
                     {menuItem.map((row) => (
                            <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.menuItemId}
                            </TableCell>
                            <TableCell align="right">{row.menuName}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                            <TableCell align="right">{row.foodCategory}</TableCell>
                            <TableCell align="right">{row.rate}</TableCell>
                            <TableCell align="right">{row.serviceTax}</TableCell>
                            <TableCell align="right">{row.totalAmount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}


export default MenuItemlist