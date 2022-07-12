import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import "./custom.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BaseUrl from "../config/BaseUrl";
import { useParams } from "react-router-dom";

const EditBillReport= () => {
    const {id} =useParams()
  const [fooodContainer, setfooodContainer] = useState([ { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" }]);

   const [userdata,setuserdata] =useState()
   const [laoding,setloading] =useState(true)
  

    const [userBill,setUserBill] =useState()
  const dataHandler = (event) => {
    setUserBill(() => ({
      [event.target.name]: event.target.value,
    }));
  };


  console.log(fooodContainer)
  const handleAddFields = () => {
    setfooodContainer([
      ...fooodContainer,
      { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
    ]);
  };
 

  const foodquantityHandler = (e) => {
    if (e.target.value) {
      let tempArray = fooodContainer.map((food) => {
        if (food.id == e.target.id) food.quantity = e.target.value * 1;
        return food;
      });
      setfooodContainer(tempArray);
      foodDataHandlre(userBill, e.target.id);
    }
  };
  const foodApi = (e) => {
    axios
      .get(`${BaseUrl.url}/api/v1/searchItem?MenuItemId=${e.target.value}`)
      .then((res) => {
        let response = res.data.food;
        let tempArray = fooodContainer.map((food) => {
          if (food.id == e.target.id) {
            food.menuItemId = response.menuItemId;
            food.menuName = response.menuName;
            food.Amount = response.totalAmount;
          }
          return food;
        });
        setfooodContainer(tempArray);
        foodDataHandlre(userBill, e.target.id);
      });
   };

  const foodDataHandlre = (userBill, Id) => {
    console.warn(Id)
    fooodContainer.map((food) => {
      if (food.id === Id) {
        userBill.foods.push(food);
      } else {
      }
    });
  };


   const EditBilgenreate =()=>{
       axios.get(`${BaseUrl.url}/api/v2/bill/report/${id}`)
       .then((res)=>{
           setuserdata(res.data.data)
           setloading(false)
       })
      .catch((err)=>{
        console.log(err.message)
      })
   }


   console.log(userdata)


  const EditData =()=>{
       axios.patch(`${BaseUrl.url}/api/v2/edit/report/${id}`,userBill)
       .then(res=>{
         console.log(res.data.data)
          alert('upadetd billing data')
       })   
  }

  useEffect(() => {
       EditBilgenreate()
  }, [fooodContainer]);

  if(laoding){
    return(
        <div>loading.....</div>
    )
  }
  return (
    <>
      <div className="container mt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="Date"
                defaultValue={userdata.Date}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="CustomerMobileNumber"
                placeholder="Customer Mobile Number"
                defaultValue={userdata.CustomerMobileNumber}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="TableNumber"
                placeholder="Table Number"
                defaultValue={userdata.TableNumber}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="CustomerName"
                placeholder="Customer Name"
              defaultValue={userdata.CustomerName}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="WaiterName"
                placeholder="WaiterName"
              defaultValue={userdata.WaiterName}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="gstNumber"
                placeholder="GST Number"
              defaultValue={userdata.gstNumber}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="Reason"
                placeholder="Reason"
              defaultValue={userdata.Reason}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="kotdetails"
                placeholder="Kot Details"
              defaultValue={userdata.kotdetails}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Code</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {userdata.foods.map((inputField, id) => {
                return (
                  <tr key={inputField._id}>
                    <td>{id + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="MenuItemId"
                        id={inputField.id}
                      defaultValue={inputField.menuItemId}
                        onChange={(e) => foodApi(e)}
                        placeholder="Item Code"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="MenuName"
                      defaultValue={inputField.menuName}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="quantity"
                        id={inputField.id}
                        defaultValue={inputField.quantity * 1}
                        onChange={(event) => foodquantityHandler(event)}
                        placeholder="Quantity"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="Amount"
                        defaultValue={+inputField.quantity * inputField.Amount}
                        readOnly
                      />
                    </td>
                    <td>
                      {userdata.foods.length-1===id &&(
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        onClick={handleAddFields}
                      >
                        {" "}
                        Add
                      </button>
                      )}
                    </td>  
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="row">
            <div className="col-4">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                placeholder="Room Service Charge"
                name="RoomServiceCharge"
              defaultValue={userdata.RoomServiceCharge}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="SGST"
                placeholder="Add SGST"
              defaultValue={userdata.SGST}
                onChange={(event)=>{dataHandler(event)}}
                readOnly
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                 name="TotalAmount"
               defaultValue={userdata.TotalAmount}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="NumberofPerson"
                placeholder="No. of Person"
              defaultValue={userdata.NumberofPerson}
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="CGST"
              defaultValue={userdata.CGST}
                readOnly
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="DiscountPrice"
                placeholder="DiscountPrice"
                defaultValue={userdata.DiscountPrice}
                readOnly
                onChange={(event)=>{dataHandler(event)}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4" style={{"position":"relative","left":"744px"}}>
              <input
                type="text"
                className="form-control form-control-sm mt-3"
                name="FinalBillAmount"
                placeholder="netBillAmount"
                defaultValue={userdata.FinalBillAmount}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="btn">
              <button type="button" className="btn btn-primary btn-lg float-right"  onClick={EditData}>
                Edit 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBillReport;
