import React, { useEffect, useState,useContext } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import jazzyLogo from "../assets/image 2.svg";
import { Link,useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import AuthContext from "../context/AuthContext";



const LogIn = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { setLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogin = async(e)=>{
    e.preventDefault()
    const logInData = {
      email,
      password,
    };
    try {
      const data = await fetch('https://jazzy-mern.onrender.com/api/user/login',{
        method:"POST",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify(logInData),
      });
      const res = await data.json();
      console.log(res);
      if(res.success === false || res.name === "ValidationError"){
        toast.error(res.message)
      }
      if(res.success === true){
        toast.success(res.message)
        
      }
      if(res.error === 'Account Suspended,Too many API requests from this IP, please try again after 2 mins'){

        toast.error(res.error)
      }
      if(res.user.token){
        localStorage.setItem('token', res.user.token)
        navigate('/')
        setLoggedIn(true)
      }
      
    } catch (error) {
      console.log(error.message);
     
      
    }

  }
  useEffect(()=>{
    document.title = 'Log In | Page'
  })

  return (
    <>
      <main className="container vh-50 d-flex flex-column  my-3 ">
        <div className="">
          <div className="text-center">
            <Link to="/">
              <img src={jazzyLogo} alt="jazzy-logo" className="" />
            </Link>
          </div>
          <h2 className="fs-3 fw-bold my-4 text-center w-75 m-auto">
            SIGN IN TO YOUR ACCOUNT
          </h2>

          <Form className="w-75 m-auto">
            <Form.Label className=" fs-6 text-secondary ">Email </Form.Label>

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
            <Form.Label className=" fs-6 text-secondary">Password </Form.Label>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                className="border border-3 rounded"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Form className="mt-3 d-flex justify-content-between">
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
              <Link className="text-decoration-none" to='/forgot-password'> Reset Password </Link>
            </Form>
            <button className="btn btn-danger w-100 fs-3" onClick={handleLogin}>Sign In</button>
            <p className="text-center mt-3 fw-bold">Dont have an account? <Link className="text-decoration-none" to='/SignUp'>Create one</Link></p>
          </Form>
        </div>
      </main>
    </>
  );
};

export default LogIn;
