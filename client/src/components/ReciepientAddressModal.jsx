import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";
import { useState } from "react";

function MyVerticallyCenteredModal(props) {
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
          Update Recipient
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="w-75 m-auto" onSubmit={handlSignUp}>
            {/* first name */}
          <Form.Label className=" fs-6 text-secondary">First Name</Form.Label>

          <FloatingLabel
            controlId="floatingInput"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="First Name"
              className="border border-3 rounded"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FloatingLabel>
          {/* last name */}
          <Form.Label className=" fs-6 text-secondary">Last Name </Form.Label>

          <FloatingLabel
            controlId="floatingPassword"
            label="Last Name "
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Last Name"
              className="border border-3 rounded"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FloatingLabel>
          {/* EMAIL */}
          <Form.Label className=" fs-6 text-secondary">Email </Form.Label>

          <FloatingLabel
            controlId="floatingInput"
            label="example@mail.com"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              className="border border-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          {/* Phone number */}
          <Form.Label className=" fs-6 text-secondary">Phone Number</Form.Label>

          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="basic-addon1" className="bg-secondary fw-bold">
              +234
            </InputGroup.Text>
            <Form.Control
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>

          <button className="btn btn-danger w-100 fs-5">Submit</button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
