import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
// import "./custom.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BaseUrl from "../config/BaseUrl";
import { Identity } from "@mui/base";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const KitchenBillingSystem = () => {
  const navigate = useNavigate();
  const [fooodContainer, setfooodContainer] = useState([
    { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
  ]);
  const [totalBillAmount, setTotalBillAmout] = useState(0);
  const [GST, setGST] = useState(0);
  const [discountprice, setdiscountprice] = useState(0);
  const [roomServiceCharge, setroomServiceCharge] = useState(0);
  const [userBill, setUserBill] = useState({
    Date: "",
    TableNumber: "",
    WaiterName: "",
    WaiterName: "",
    Reason: "",
    kotdetails: "",
    CustomerMobileNumber: "",
    CustomerName: "",
    gstNumber: "",
    TotalAmount: 0,
    SGST: "",
    CGST: "",
    DiscountPrice: 0,
    FinalBillAmount: "",
    RoomServiceCharge: "",
    NumberofPerson: "",
    foods: [],
  });
  const [netBillAmount, setnnetBillAmount] = useState();
  const handleAddFields = () => {
    setfooodContainer([
      ...fooodContainer,
      { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
    ]);
    foodDataHandlre(userBill);
  };

  const dataHandler = (event) => {
    setUserBill((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const discounHandler = (event) => {
    setdiscountprice(event.target.value);
    const finalbillAmount =
      totalBillAmount +
      GST * 1 +
      GST * 1 +
      roomServiceCharge * 1 -
      event.target.value * 1;
    setnnetBillAmount(finalbillAmount);
    setUserBill((preState) => ({
      ...preState,
      DiscountPrice: event.target.value,
      FinalBillAmount: finalbillAmount,
    }));
  };

  const handleRemoveFields = (id) => {
    const value = [...fooodContainer];
    console.log(value);
    const filteredArray = value.filter((data) => {
      return data.id !== id;
    });
    setfooodContainer(filteredArray);

    const data = [...userBill.foods];
    const foodfilterArray = data.filter((data) => {
      return data.id !== id;
    });
    setUserBill((preState) => ({
      ...preState,
      foods: foodfilterArray,
    }));
  };

  console.log(userBill.foods);

  const foodquantityHandler = (e) => {
    if (e.target.value) {
      let tempArray = fooodContainer.map((food) => {
        if (food.id == e.target.id) food.quantity = e.target.value * 1;
        return food;
      });

      setfooodContainer(tempArray);
      foodDataHandlre(userBill);
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
    fooodContainer.map((food) => {
      if (food.id === Id) {
        userBill.foods.push(food);
      }
    });
  };

  const getTotalAmout = (userBill) => {
    let total = 0;
    let gst = 0;
    let finalbillAmount = 0;
    for (let i = 0; i < fooodContainer.length; i++) {
      total = +fooodContainer[i].quantity * fooodContainer[i].Amount + total;
      gst = Math.floor((total * 9) / 100);
      finalbillAmount = Math.floor(total + gst * 1 + gst * 1);
      setTotalBillAmout(total);
      setGST(gst);
      setnnetBillAmount(finalbillAmount);
    }
    foodDataHandlre(userBill);
    setUserBill((prestate) => ({
      ...prestate,
      TotalAmount: total,
      SGST: gst,
      CGST: gst,
      FinalBillAmount: finalbillAmount,
    }));
  };

  const roomServicehandler = (event) => {
    setroomServiceCharge(event.target.value);
    const finalbillAmount =
      totalBillAmount +
      GST * 1 +
      GST * 1 +
      event.target.value * 1 -
      discountprice;
    setnnetBillAmount(finalbillAmount);
    setUserBill((prestate) => ({
      ...prestate,
      FinalBillAmount: finalbillAmount,
      RoomServiceCharge: event.target.value,
    }));
  };

  const dataSubmitHandler = () => {
    axios.post(`${BaseUrl.url}/api/v2/bill/genrate`, userBill).then((res) => {
      console.log(res.data.data);
      toast.success("Bill Generate Sucessfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
        theme: "colored",
      });
      navigate("/bill/65743");
      navigate(`/bill/${res.data.data._id}`);
    });
  };

  useEffect(() => {
    getTotalAmout(userBill);
  }, [fooodContainer]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              {/* <div class="panel-heading">
          <h5 class="panel-title text-center">Bill Generate</h5>
      </div> */}
              <div className="panel-body">
                <div className="form-group">
                  <label className="control-label col-sm-2">Date</label>
                  <div className="col-sm-4">
                    <input
                      type="date"
                      className="form-control"
                      name="Date"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                  <label className="control-label col-sm-2">Phone No.</label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      id="PhoneNo"
                      name="CustomerMobileNumber"
                      placeholder="Customer Mobile Number"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label className="control-label col-sm-2">Table No.</label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="TableNumber"
                      placeholder="Table Number"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                  <label className="control-label col-sm-2" html>
                    Name
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="CustomerName"
                      placeholder="Customer Name"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label className="control-label col-sm-2">Waiter No.</label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="WaiterName"
                      placeholder="WaiterName"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                  <label className="control-label col-sm-2">GST No.</label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="gstNumber"
                      placeholder="GST Number"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label className="control-label col-sm-2">Reason</label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="Reason"
                      placeholder="Reason"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                  <label className="control-label col-sm-2" html>
                    Kot Details
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="kotdetails"
                      placeholder="Kot Details"
                      onChange={(event) => {
                        dataHandler(event);
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <br />
                <table className="table" style={{"backgroundColor":"#F2F3F5"}}>
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Code</th>
                      <th>Item Name</th>
                      <th>Quatity</th>
                      <th>Price</th>
                      <th >Action</th>
                      <th >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fooodContainer.map((inputField, id) => {
                      return (
                        <tr>
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
                              value={inputField.menuName}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm "
                              name="quantity"
                              id={inputField.id}
                              defaultValue={inputField.quantity}
                              onChange={(event) => foodquantityHandler(event)}
                              placeholder="Quantity"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm "
                              name="Amount"
                              value={+inputField.quantity * inputField.Amount}
                              readOnly
                            />
                          </td>

                          <td>
                            {fooodContainer.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-default btn-sm"
                                onClick={() => {
                                  handleRemoveFields(inputField.id);
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </td>

                          <td>
                            {fooodContainer.length - 1 === id && (
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
                      );
                    })}
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="panel-body">
                      <div className="form-group">
                        <div className="col-sm-4">
                          <h5>Amount:</h5>
                          <input
                            type="text"
                            className="form-control"
                            value={totalBillAmount}
                            placeholder="Amount"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-4">
                          Add SGST:
                          <input
                            type="text"
                            className="form-control"
                            name="CGST"
                            value={GST}
                            readOnly
                            placeholder="Add SGST"
                            disabled
                          />
                        </div>
                        <div className="col-sm-4">
                          {" "}
                          Room Service Charge:
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Room Service Charge"
                            name="RoomServiceCharge"
                            onChange={(event) => {
                              roomServicehandler(event);
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <br /> <br />
                      <div className="form-group">
                        <div className="col-sm-4">
                          {" "}
                          Discount:
                          <input
                            type="text"
                            className="form-control"
                            name="DiscountPrice"
                            placeholder="Discount"
                            defaultValue={userBill.DiscountPrice}
                            onChange={(event) => {
                              discounHandler(event);
                            }}
                          />
                        </div>
                        <div className="col-sm-4">
                          {" "}
                          Add CGST:
                          <input
                            type="text"
                            className="form-control"
                            name="CGST"
                            value={GST}
                            placeholder="Add CGST"
                            disabled
                          />
                        </div>
                        <div className="col-sm-4">
                          No. of Person:
                          <input
                            type="text"
                            className="form-control"
                            placeholder="No. of Person"
                            name="NumberofPerson"
                            onChange={(event) => {
                              dataHandler(event);
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <br /> <br />
                      <div className="form-group">
                        <div className="col-sm-4">
                          Net Bill Amount:
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Net Bill Amount"
                            value={netBillAmount}
                            disabled
                          />
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2 col-lg-offset-5">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg btn-block"
                      onClick={dataSubmitHandler}
                     >Generate Bill</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default KitchenBillingSystem;
