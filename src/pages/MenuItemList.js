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
import DataTable,{ createTheme } from 'react-data-table-component';
import { useNavigate } from "react-router-dom";




const customStyles = {
    row: {
        style: {
            backgroundColor:"yellow"
        },
    },
    headCells: {
        style: {
            backgroundColor:" #F2F3F5",
            borderRight:'1px solid white',
            paddingLeft:"60px"
        },
    },
    cells: {
        style: {
            paddingLeft:"60px",
            borderRight:'1px solid white',
        },
    },
};



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


    const columns =[
        {
            name:'MenuItemId',
            selector: row => row.menuItemId,
            sortable:true
        },
        {
            name:'MenuItemName',
            selector: row => row.menuName,
            sortable:true
        },
        {
            name:'Category',
            selector:row=>row.category,
            sortable:true
        },
        {
            name:'Food Category',
            selector:row=>row.foodCategory,
            sortable:true
        },
        {
            name:'Amount',
            selector:row=>row.rate,
        },
        {
            name:'Service Tax',
            selector:row=>row.serviceTax,
        },
        {
            name:'Toatl Amount',
            selector:row=>row.totalAmount,
            sortable:true
        }


    ]


      
    if(loading){
        return(
            <div>Loading......</div>
        )
    }

    return(
        <>
           <div class="container-fluid">
          <h1 class="text-center"><b>Menu Item List</b></h1>
            <DataTable
                title="Menu Card"
                columns={columns}
                data={menuItem}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customStyles}
                subHeader
                subHeaderComponent={<input type="text" placeholder='search...' className='form-control'/>}
                
             />
       </div>
        </>
    )
}


export default MenuItemlist