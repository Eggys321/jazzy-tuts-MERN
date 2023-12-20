import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";
import { useState } from "react";

function ReciepientAddressModal(props) {
  const [address,setAddress] = useState({
    city:'',
    housenumber:'',
    street:''
  })
 
  function handleChange(e){
    const value = e.target.value;
    setAddress({
        ...address,
      [e.target.name]: value
    });
   
  }

  
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!address.city || !address.housenumber || !address.street){
        toast.error('all fields must be filled')
        // setError('all fields must be submitted')
        return
    }
    if(address.street.length > 15){
        toast.error('street min lenght must be atleast 15 and you typed ' + address.street.length + ' chrs which is less than required')
        return

    }
    if(address.city && address.housenumber && address.street && address.street.length <= 15){

      setAddress({city:'',housenumber:'',street:""})
      localStorage.setItem('address', JSON.stringify(address))
      console.log(address);
      toast.success('address added successfully')
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
          Add Address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <form>
        <input type="text" name="city" placeholder="city" value={address.city} onChange={handleChange} />
        <input type="text" name="housenumber" placeholder="house number" value={address.housenumber} onChange={handleChange} />
        <input type="text" name="street" placeholder="street" value={address.street} onChange={handleChange} />
       <br /><br />
        <button onClick={handleSubmit} className="btn btn-primary">
          submit
        </button>
      </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReciepientAddressModal;
