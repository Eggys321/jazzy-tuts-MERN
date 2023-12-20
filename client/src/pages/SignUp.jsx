import React, { useEffect, useState } from "react";
import jazzyLogo from "../assets/image 2.svg";
import { Link,useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import toast from 'react-hot-toast';



const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [verifypassword,setVerifyPassword] = useState('');
  const [phonenumber,setPhoneNumber] = useState('');

  const navigate = useNavigate()

  const handlSignUp = async(e)=>{
    e.preventDefault()
    const signUpData = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
      verifypassword
    }
    try {
      const data = await fetch('https://jazzy-mern.onrender.com/api/user/registration',{
        method:"POST",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const res = await data.json();
      console.log(res);
      if(res.success === false || res.name === "ValidationError"){
        toast.error(res.message)
      }
      if(res.success === true){
        toast.success(res.message)
        navigate('/LogIn')

      }
      // if(res.name === "ValidationError"){
      //   toast.error(res.message)
      // }
    } catch (error) {
      toast.error
    }
  
  }
  useEffect(() => {
    document.title = "Sign Up | Page";
  });
  return (
    <>
      <main className="container my-3">
        <div className="mb-5">
          <div className="text-center">
            <Link to="/">
              <img src={jazzyLogo} alt="jazzy-logo" />
            </Link>
          </div>
          <h2 className="text-center fs-3 fw-bold my-4 text-center ">
            CREATE YOUR ACCOUNT
          </h2>
          <Form className="w-75 m-auto" onSubmit={handlSignUp}>
            <Form.Label className=" fs-6 text-secondary">
              First Name
            </Form.Label>

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
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </FloatingLabel>
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
                onChange={(e)=>setLastName(e.target.value)}
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
                onChange={(e)=>setEmail(e.target.value)}
              />
            </FloatingLabel>
            {/* Phone number */}
            <Form.Label className=" fs-6 text-secondary">
              Phone Number
            </Form.Label>

            <InputGroup className="mb-3" size="lg">
              <InputGroup.Text id="basic-addon1" className="bg-secondary fw-bold">+234</InputGroup.Text>
              <Form.Control
                placeholder=""
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={phonenumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
              />
            </InputGroup>
            {/* password */}
            <Form.Label className=" fs-6 text-secondary">
              Password (8 minimum characters)
            </Form.Label>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                className="border border-3 rounded my-3"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </FloatingLabel>
            {/* confirm */}
            <Form.Label className=" fs-6 text-secondary">
              Confirm Password
            </Form.Label>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                className="border border-3 rounded mb-3"
                value={verifypassword}
                onChange={(e)=>setVerifyPassword(e.target.value)}
              />
            </FloatingLabel>
            <div>
                {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={'Keep me signed in'}
                    className="fs-6 fw-bold"
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-danger w-100 fs-3">Create account</button>
            <p className="text-center mt-3 fw-bold">Have an account?  <Link className="text-decoration-none" to='/Login'>Sign In</Link></p>

          <p className="text-center fw-bold ">By Creating your Quickmunch account, you agree to the  <Link to='#'>Terms of use</Link> and <Link to='#'> Privacy Policy</Link></p>
          </Form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
