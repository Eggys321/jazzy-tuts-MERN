import React, { useState,useContext, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import navLogo from "../assets/image 2.svg";
import locationLogo from "../assets/Vector (1).svg";
import allProductLogo from "../assets/Vector (2).svg";
import guestLogo from "../assets/Vector (3).svg";
import cartLogo from "../assets/Vector (4).svg";
import Cart from "../pages/Cart";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUpOutline } from "react-icons/io5";
import AuthDropdown from "../components/AuthDropdown";
import CartContext from "../context/CartContext";

const NavBar = () => {
  const {cart,loggedIn} = useContext(CartContext)
  const [user,setUser] = useState(null)
  const token = localStorage.getItem('token')

  const [show, setShow] = useState(false);
  const [authShow, setAuthShow] = useState(false);
  let getUser = async () => {
    let response = await fetch('http://localhost:5750/api/user/getusername', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    setUser(data.firstname);
    console.log(data.firstname);
  };
  useEffect(()=>{
    getUser()
  },[])
  return (
    <main className="container position-relative">
      
      <nav className="container d-flex justify-content-between align-items-center">
        <section className="d-flex justify-content-between align-items-center gap-3">
          <div>
            <Link to="/">
              <img src={navLogo} alt="nav-logo" className="img-fluid p-3" />
            </Link>
          </div>
          <div>
            <img
              src={locationLogo}
              alt="location-logo"
              className="d-none d-lg-block"
            />
          </div>
          <h5 className="d-none d-lg-block text-danger">Lagos, Nigeria </h5>
        </section>

        <section className="d-flex justify-content-between align-items-center gap-4">
          <img
            src={allProductLogo}
            alt="allProduct-logo"
            className="img-fluid"
          />
          <h5 className="d-none d-md-block mt-3 text-danger">All Products</h5>
          <div
            className="d-flex gap-3 position-relative"
            role="button"
            onClick={() => (!authShow ? setAuthShow(true) : setAuthShow(false))}
          >
            <img src={guestLogo} alt="guest-logo" />
            <h5 className="d-none d-md-block mt-3 text-secondary">Hi,  {token ?  <> {user} </> : <> Guests </>} </h5>
            {!authShow ? (
              <div className="d-none d-md-block mt-3 text-secondary">
                <IoChevronDown />
              </div>
            ) : (
              <div className="d-none d-md-block mt-3 text-secondary">
                
                <IoChevronUpOutline />
              </div>
            )}

            <div className="position-absolute top-100 end-0 mt-3  ">
              {authShow && <AuthDropdown />}
            </div>
          </div>
          {/* <IoChevronUpOutline  className="d-none d-lg-block mt-2" /> */}

          <div onClick={() => (!show ? setShow(true) : setShow(false))}>
            <div className="position-relative">
              <div className="bg-danger text-light position-absolute top-0 start-100 translate-middle rounded-pill h-75 p-1">
             <p className=""> {cart.length}</p>
              </div>
              
              <img src={cartLogo} role="button" alt="cart-logo" />
            </div>
          </div>
        </section>
      </nav>
      <div className="position-absolute end-0 "> {show && <Cart />} </div>

      <Outlet />
    </main>
  );
};

export default NavBar;
