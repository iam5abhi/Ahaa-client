import React,{useState} from 'react'
import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'



const BillWiseReport =()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
         <>
             <Button variant="primary" onClick={handleShow}>
                  Launch demo modal
            </Button>

      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton  style={{'border-top': '10px solid #92cbdf','border-left': '10px solid #92cbdf','border-right': '10px solid #92cbdf','backgroundColor':'#92cbdf'}} >
          <Modal.Title>Bill Wise Sale Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
               <Form.Group className="mb-3" controlId="Date">
                        <Form.Label>Starting Date</Form.Label>
                        <Form.Control type="Date" name='startDate' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="Date">
                        <Form.Label>Ending Date</Form.Label>
                        <Form.Control type="Date" name='endDate' />
               </Form.Group>

               <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Type</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Sale</option>
                        </Form.Select>
                </Form.Group>


                <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Ok
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                </Modal.Footer>     
          </Form>
        </Modal.Body>
       
      </Modal>
         </>
    )
}



export default BillWiseReport