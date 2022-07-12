import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import BaseUrl from "../config/BaseUrl";
import axios from "axios";

const CustomerBill = () => {
    const {id} =useParams()
    const [laoding,setloading] =useState(true)
    const[billingdata,setbillingdata] =useState()

  const billgenreate =()=>{
    axios.get(`${BaseUrl.url}/api/v2/bill/report/${id}`)
    .then((res)=>{
        setbillingdata(res.data.data)
        setloading(false)
    })
    .catch(err=>{
        alert(err.message)
    })

  }  
console.log(billingdata)
 useEffect(()=>{
    billgenreate()
 },[id])   

 if(laoding){
    return(
        <div>loading.....</div>
 
    )
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
          <h5 className="text-center">Restaurant Bill</h5>
            <div className="row mb-4">
              <div className="col-sm-6 pt-3 w-60">
                <h6 className="mb-3">Bill No:{billingdata._id}</h6>
                <div>
                  <h6 className="mb-3 w-20" >Date:{billingdata.Date}</h6>
                </div>
              </div>
              <div className="col-sm-6 pt-3">
                <h6 className="mb-3">Table No:{billingdata.TableNumber}</h6>
                <div>
                  <strong>{billingdata.CustomerName}</strong>
                </div>
                <div>Phone:{billingdata.CustomerMobileNumber}</div>    
              </div>
            </div>
            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Item</th>
                    <th className="center">Qty</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                     billingdata.foods.map((data,id)=>{
                        return(
                            <tr>
                            <td className="center">{id+1}</td>
                            <td className="left strong">{data.menuName}</td>
                            <td className="center">{data.quantity}</td>
                            <td className="right">{data.Amount}</td>
                          </tr>
                        )
                     })
                  }
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-5"></div>
              <div className="col-lg-4 col-sm-5 ml-auto">
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right">{billingdata.TotalAmount}</td>
                    </tr>

                    <tr>
                      <td className="left">
                        <strong>SGST</strong>
                      </td>
                      <td className="right">{billingdata.SGST}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>CGST</strong>
                      </td>
                      <td className="right">{billingdata.CGST}</td>
                    </tr>

                    <tr>
                      <td className="left">
                        <strong>Room Service.Charge</strong>
                      </td>
                      <td className="right">{billingdata.RoomServiceCharge}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Net Discount</strong>
                      </td>
                      <td className="right">{billingdata.DiscountPrice}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Payable Discount</strong>
                      </td>
                      <td className="right">
                        <strong>{billingdata.FinalBillAmount}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerBill;
