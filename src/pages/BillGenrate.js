import React,{useState} from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Container from '@mui/material/Container';
import { Paper,Grid,Box,TextField } from '@mui/material';
import './custom.css'



const BillGenrate =()=>{

       const userTemaple ={MenuItemId:'',MenuName:'',quantity:'',Amount:''}
       const [users,setUsers]=useState([userTemaple])
       const[Bill,setBill] =useState({Date:'',TableNumber:'',Discount:'',WaiterName:'',CustomerMobileNumber:'',CustomerName:'',gstNumber:'',roomserviceCharge:'',TotalAmount:'',CGST:'',SGST:'',FinalBillAmount:''})

       const dataHandler =(event)=>{
            const {name,value}=event.taget
            setBill((previousdata)=>({
                ...previousdata,
                [name]:value
            }))

       }
     console.log(Bill,"vviikkkaassss")

       const abc =()=>{
         setUsers(...users,userTemaple)
       }
       console.log(users)
    return(
        <> 
              <div clasName ="Container">
               <div className='main-container'>
                   <h5 className='main-container-heading'>Kitchen Bill generate</h5>
               </div>
               <div className="container-body">
               <Container>
                   <Form>
                        
                        <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="Date"name='Date' onChange={dataHandler} />
                        </Form.Group>


                        <Form.Group className="mb-3" >
                                <Form.Label>Table Number</Form.Label>
                                <Form.Control type="text"name='TableNumber' onChange={dataHandler}  />
                        </Form.Group>

                        <Form.Group className="mb-3">
                                <Form.Label>Discount</Form.Label>
                                <Form.Control type="text"name='DisCount'  onChange={dataHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                                <Form.Label>Waiter Name</Form.Label>
                                <Form.Control t ype="text"name='WaiterName' onChange={dataHandler}   />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                                <Form.Label>Customer Mobile Number</Form.Label>
                                <Form.Control type="text"name='CustomerMobileNumber' onChange={dataHandler}  />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control type="text"name='CustomerName'  />
                        </Form.Group>


                        <Form.Group className="mb-3" >
                                <Form.Label>Gst No:</Form.Label>
                                <Form.Control type="text"name='gstNumber' onChange={dataHandler}  />
                        </Form.Group>
                         <Container>
                                <Paper component={Box} p={4}>
                                    <Grid container>
                                    <Table striped bordered hover>
                              <thead>
                                    <tr>
                                      <th>Sr</th>
                                      <th>Code</th>
                                      <th>Item Name</th>
                                      <th>Quantity</th>
                                      <th>Price</th>
                                      <th>#</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {
                                        users.map((user,index,exact)=>{
                                                    <tr key={index}>
                                                               <td><input type='text' name="MenuItemId" value={user.MenuItemId} id="standard-basic" exact={`${exact}`}/></td>
                                                                 <td><input type='text' value={user.MenuName} id="standard-basic"/></td>
                                                                 <td><input type='text' value={user.quantity} id="standard-basic"/></td>
                                                                 <td><input type='text' navalueme={user.Amount} id="standard-basic"/></td>
                                                                 <td><button onClick={abc}>Add</button></td>
                                                    </tr>
                                              
                                        })
                                         
                                    }
                          
                              </tbody>
                       </Table>
                                    </Grid>
                                </Paper>
                         </Container>
                         
                        <Form.Group className="mb-3" >
                                <Form.Label>Room Service Charge</Form.Label>
                                <Form.Control type="text"name='roomserviceCharge' onChange={dataHandler}  />
                        </Form.Group>
                          
                        <Form.Group className="mb-3" >
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text"name='TotalAmount' onChange={dataHandler}  disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                                <Form.Label>ADD CGST</Form.Label>
                                <Form.Control type="text"name='CGST' onChange={dataHandler}  disabled  />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                                <Form.Label>ADD SGST</Form.Label>
                                <Form.Control type="text"name='SGST' onChange={dataHandler} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                                <Form.Label>Discount</Form.Label>
                                <Form.Control type="text"name='SGST' onChange={dataHandler} disabled  />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                                <Form.Label>Total Bill Amount</Form.Label>
                                <Form.Control type="text"name='FinalBillAmount' onChange={dataHandler} disabled  />
                        </Form.Group>


                        <Button variant="secondary" style={{'margin-left':'85%'}}>Cancel</Button>&nbsp;&nbsp;
                        <Button variant="primary">Save</Button>
                    </Form>
                    </Container>
                     
               </div>
               <br/>
              
           </div>
        </>
    )
}



export default BillGenrate