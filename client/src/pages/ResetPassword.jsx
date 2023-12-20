import React, { useEffect, useState } from "react";
import jazzyLogo from "../assets/image 2.svg";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link,useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
const ResetPassword = () => {
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const { resetToken } = useParams();
    const navigate = useNavigate()

    const resetPasswordHandler =  async(e)=>{
        e.preventDefault()
        const logInData={
            password
          }
          if(password !== confirmPassword){
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
              setError('')
              
            }, 5000);
            return setError("Passwords must match")

        }
          try {
            const data = await fetch(`https://jazzy-mern.onrender.com/api/user/resetpassword/${resetToken}`, { method:"PUT",
            headers:{
              "Content-type": "application/json",
            },
            body: JSON.stringify(logInData)});
            const response = await data.json()
            // setSuccess(data.data)
            console.log(response);
         
            if(response.success === true){
              toast.success(response.message)
              navigate('/LogIn')
            }
            
            if(response.success === false){
      
              setError(response.message)
            }
           
          } catch (error) {
            console.log(error);
            
          }

    }
  return (
    <>
    <main className="container vh-50 d-flex flex-column  my-3  ">
        <div className="">
          <div className="text-center">
            <Link to="/">
              <img src={jazzyLogo} alt="jazzy-logo" className="" />
            </Link>
          </div>
          <h2 className="fs-3 fw-bold my-4 text-center w-75 m-auto">
            Reset Password
          </h2>
          {/* {error && <span>{error} </span>}
          {success && <span> {success} </span>} */}
          {/* <p className="text-center">Let's help you recover your password</p> */}

          <Form className="w-75 m-auto" onSubmit={resetPasswordHandler}>
            <Form.Label className=" fs-6 text-secondary ">Password </Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label="example@mail.com"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="name@example.com"
                className="border border-3 rounded"
                value={password}
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Form.Label className=" fs-6 text-secondary "> Confirm Password </Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label="example@mail.com"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="name@example.com"
                className="border border-3 rounded"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </FloatingLabel>
            {error && <span className="text-danger fst-italic">{error} </span>}

            
            <button className="btn btn-danger w-100 fs-3">Reset Password</button>
          
          </Form>
        </div>
      </main>
    
    </>
  )
}

export default ResetPassword