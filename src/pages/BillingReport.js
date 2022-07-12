import React,{useState,useEffect} from "react";
import axios from "axios";
import BaseUrl from "../config/BaseUrl";
import DataTable,{ createTheme } from 'react-data-table-component';
import { useNavigate } from "react-router-dom";




const customStyles = {
    row: {
        style: {
            
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





const BillingReport =()=>{

    const navigate =useNavigate()

    const [loading,setloading] =useState(true)
    const [reportdata,setreportdata]=useState()

    const billingreport =()=>{
        axios.get(`${BaseUrl.url}/api/v2/bill/report`)
        .then((res)=>{
            setreportdata(res.data.reportdata)
            setloading(false)
            
        })
    }

    const billingreports =(id)=>{
        navigate(`/report/${id}`)
    }


    const columns =[
        {
            name:'Date',
            selector: row => row.Date,
            sortable:true
        },
        {
            name:'Bill no',
            selector: row => row._id,
        },
        {
            name:'Amount',
            selector:row=>row.FinalBillAmount,
            sortable:true
        },
        {
            name:'cash'
        },
        {
            name:'Credit/Account'
        },
        {
            name:'User',
            selector:row=>"counter1"
        },
        {
            name:'Action',
            cell:(row)=><button className="btn btn-sm btn-primary" onClick={()=>{billingreports(row._id)}}>Edit</button>
        },

        {
            name:'Action',
            cell:(row)=><button className="btn btn-sm btn-danger" onClick={()=>{billingreports(row._id)}}>Delete</button>
        }


    ]


    useEffect(() => {
        billingreport()
    }, []);


     if(loading){
         return(
            <div>loading...</div>
         )
     }

    return(
        <>
        <div class="container-fluid">
          <h1 class="text-center"><b>Bill Wise Report</b></h1>
            <DataTable
                title="Sale Report"
                columns={columns}
                data={reportdata}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customStyles}
                
             />
       </div>
      </>
  )


}


export default BillingReport