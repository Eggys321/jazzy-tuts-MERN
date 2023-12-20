import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";
import { useState } from "react";

function ReciepientAddressModal(props) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const handlSignUp = async (e) => {
    e.preventDefault();
    const signUpData = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
      verifypassword,
    };
    try {
      const data = await fetch("http://localhost:5750/api/user/registration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const res = await data.json();
      console.log(res);
      if (res.success === false || res.name === "ValidationError") {
        toast.error(res.message);
      }
      if (res.success === true) {
        toast.success(res.message);
        navigate("/LogIn");
      }
      // if(res.name === "ValidationError"){
      //   toast.error(res.message)
      // }
    } catch (error) {
      toast.error;
    }
  };
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
        
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReciepientAddressModal;
