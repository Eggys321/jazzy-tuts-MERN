import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";
import { useState } from "react";

function MyVerticallyCenteredModal(props) {

//   ============================================================
const [recipient,setRecipient] = useState({
    firstname:'',
    lastname:'',
    email:'',
    phonenumber:''
  })
  const [error,setError] = useState(false)

  function handleChange(e){
    const value = e.target.value;
    setRecipient({
        ...recipient,
      [e.target.name]: value
    });
   
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!recipient.firstname || !recipient.lastname || !recipient.email || !recipient.phonenumber){
        toast.error('all fields must be filled')
        setError('all fields must be submitted')
        return
    }
    if(recipient.phonenumber.length < 10){
        toast.error('phone min lenght must be atleast 10 and you typed ' + recipient.phonenumber.length + ' chrs which is less than required')
        return

    }
    if(!recipient.email.includes("@") || !recipient.email.includes(".") || !recipient.email.includes("com") ){
      toast.error('invalid email address')
      return

  }
    if(recipient.firstname && recipient.lastname && recipient.email && recipient.phonenumber && recipient.phonenumber.length >= 10){

      setRecipient({firstname:'',lastname:'',email:"",phonenumber:''})
      localStorage.setItem('recipient', JSON.stringify(recipient))
      console.log(recipient);
      toast.success('Reciepient added successfully')
    }
    try {
        
    } catch (error) {
        
    }

  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center w-100"
        >
          Update Recipient
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
      <div className="container-lg">
        <div className="ink">
          <div className="mb-3">
            <label className="sand d-block" htmlFor="">
              First Name
            </label>
            <input
            className="form-control"
             type="text" name="firstname" placeholder="first name" value={recipient.firstname} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="sand d-block" htmlFor="">
              Last Name
            </label>
            <input
             className="form-control"
            type="text" name="lastname" placeholder="last name" value={recipient.lastname} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="sand d-block" htmlFor="">
              Email
            </label>
            <input
              className="form-control "
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              value={recipient.email} onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="sand d-block" htmlFor="">
              Phone Number
            </label>
            <div className="d-flex num-inp">
            <input 
             className="form-control "
            type="number" name="phonenumber" placeholder="phone" value={recipient.phonenumber} onChange={handleChange}/><br />
            </div>
          </div>
        </div>
        <button className="btn btn-primary sub text-white" onClick={handleSubmit}>Submit</button>
      </div>

      </form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
