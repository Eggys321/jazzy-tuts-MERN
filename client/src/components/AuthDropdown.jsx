import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logInLogo from "../assets/login-logo.svg";
import signUpLogo from "../assets/signup-logo.svg";
import AuthContext from "../context/AuthContext";

const AuthDropdown = () => {
  const {loggedIn,logout} = useContext(AuthContext)
  return (
    <>
      <main className="container p-2 shadow-lg border rounded bg-light">
        <div className=" d-flex flex-column gap-3 m-3">
          {loggedIn ?
           <>   
           <Link onClick={logout}  className="btn btn-primary text-light  fs-5 ">
            Logout
            </Link> 
           <Link to='/ClientOrder'  className="btn btn-primary text-light  fs-5 ">
            Order
            </Link> 
            
            </> 
            
            :
            
            <>   <div className="d-flex bg-primary border rounded p-2 gap-3">
              <img src={logInLogo} alt="log-in-logo" /> 
            <Link to='/LogIn' className="btn text-light  fs-5 ">
            Login
            </Link>
          </div>
          <div className="d-flex p-2 gap-3 border-danger border rounded ">
              <img src={signUpLogo} alt="sign-up-logo" className="" /> 
            <Link to='/SignUp' className=" text-danger  fw-bolder btn">
            SignUp
            </Link>
          </div>  </> }
        
        </div>
      </main>
    </>
  );
};

export default AuthDropdown;
