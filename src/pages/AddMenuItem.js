import React,{useState} from 'react'
import Table  from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import './index.css'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import BaseUrl from '../config/BaseUrl'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddMenuItem =()=>{
         const [menuItem,setmenuItem] =useState({MenuName:'',Category:'',foodCategory:'',Rate:'',SalesTax:'',ManualCode:''})
         const [data,setdata] =useState('')
         const [viewOtpForm, setViewOtpForm] = useState(false);
         
         const addItemHandler =(event)=>{
             const {name,value} =event.target
             setmenuItem((previousdata)=>({...previousdata,[name]:value}))
         }
         const AddnewItem =(event)=>{
              event.preventDefault()
              axios
                  .post(`${BaseUrl.url}api/v1/addfood`,menuItem)
                  .then(res=>{
                        toast.success('item added sucessfully')
                        setViewOtpForm(true)
                        setdata(res.data.food)
                        
                  })
                  .catch(err=>{
                        toast.error(err.message)
                  })
         }
       
    return(
        <>
           <div className="Container">
               <div className='main-container'>
                   <h5 className='main-container-heading'>Add Menu items</h5>
               </div>
               <div className="container-body">
                   <Form onSubmit={AddnewItem}>

                        <Form.Group className="mb-3">
                                <Form.Label>Menu Names</Form.Label>
                                <Form.Control type="text"name='MenuName'   onChange={addItemHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label="Default select example" name='Category' onChange={addItemHandler}>
                                    <option>Category</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non_Veg">Non_Veg</option>
                                </Form.Select>       
                        </Form.Group>

                        <Form.Group className="mb-3">
                                <Form.Label>Food Category</Form.Label>
                                <Form.Select aria-label="Default select example" name="foodCategory"   onChange={addItemHandler}>
                                    <option>Food Category</option>
                                    <option value="Indian-food">Indian-food</option>
                                    <option value="Chinese-Food">Chinese-Food</option>
                                    <option value='italian food'>italian food</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Drink">Drink</option>
                                    <option value="HardDrink">HardDrink</option>
                                </Form.Select>       
                        </Form.Group>


                        <Form.Group className="mb-3">
                                <Form.Label>Stock AvailBle</Form.Label>
                                <Form.Control type="text"name='StockAvailbel'   onChange={addItemHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                                <Form.Label>Rate</Form.Label>
                                <Form.Control type="text"name='Rate' onChange={addItemHandler}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                                <Form.Label>sale tax</Form.Label>
                                <Form.Control type="text"name='SalesTax'  onChange={addItemHandler}  />
                        </Form.Group>

                        <Form.Group className="mb-3">
                                <Form.Label>ManualCode</Form.Label>
                                <Form.Control type="text"name='ManualCode'  onChange={addItemHandler}  />
                        </Form.Group>
                        <Button variant="secondary" style={{'marginLeft':'85%'}}>Cancel</Button>&nbsp;&nbsp;
                        <Button type='submit' variant="primary">Save</Button>
                    </Form>
                     
               </div>
               <br/>
                {
                  !viewOtpForm ?(
                    <div>
                       <Table striped bordered hover>
                       <thead>
                            <tr>
                              <th>Sr</th>
                              <th>Code</th>
                              <th>Item Name</th>
                              <th>Rate</th>
                              <th>Tax</th>
                              <th>Total Rate</th>
                            </tr>
                      </thead>
                       </Table>

                    </div>
                  ):(
                    <div>
                          <Table striped bordered hover>
                              <thead>
                                    <tr>
                                      <th>Sr</th>
                                      <th>Code</th>
                                      <th>Item Name</th>
                                      <th>Rate</th>
                                      <th>Tax</th>
                                      <th>Total Rate</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <td>1</td>
                                    <td>{data.menuItemId}</td>
                                    <td>{data.menuName}</td>
                                    <td>{data.rate}</td>
                                    <td>{data.serviceTax}</td>
                                    <td>{data.totalAmount}</td>
                              </tbody>
                       </Table>
                    </div>
                  )
                }
           </div>
           <ToastContainer />
        </>
    )
}


export default AddMenuItem