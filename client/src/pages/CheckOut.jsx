import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CartContext from "../context/CartContext";
import binPic from "../assets/bin-img.svg";
import MyVerticallyCenteredModal from "../components/ReciepientAuthModal.jsx";
import ReciepientAddressModal from "../components/ReciepientAddressModal.jsx";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import "../styles/CheckOut.css"

const CheckOut = () => {
  const [show, setShow] = useState(false);
  const {shown,setShown,loggedIn} = useContext(AuthContext)
  const [modalShow, setModalShow] = useState(false);
  const [modalAddress,setModalAddress] = useState(false)
  const { cart, removeItem, totalPrice, handleIncrease, handleDecrease } =
    useContext(CartContext);
    const recipient = JSON.parse(localStorage.getItem("recipient"));
  const address = JSON.parse(localStorage.getItem("address"));

  // console.log(cart);
  function doSth(){
    if(shown === true){
      setShown(false)

    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    document.title = "Check out | Page";
  });
  return (
    <>
      <main className="my-5 container row justify-content-between gap-5" onMouseEnter={doSth}>
        <section className="col-lg-6 shadow rounded p-4 h-50">
          <h2 className="fw-bold">Review and place order </h2>
          <p className="mt-4">
            Review / Add address and fulfill payments to complete your purchase
          </p>
          <hr />
          <div>
            <h5>Recipient information</h5>
            <Button variant="" className="bg-dark outline-none text-light w-75" onClick={() => setModalShow(true)}>
            Add Recipient
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <hr />
          {/* Delivery Address */}
          <div>
            <h5>Delivery Address</h5>
            <Button variant="" className="bg-dark outline-none text-light w-75" onClick={() => setModalAddress(true)}>
            Add Delivery Address
            </Button>

            <ReciepientAddressModal
            show={modalAddress}
            onHide={() => setModalAddress(false)}
            />
            <hr />
            {
              recipient === null || address === null ?             <Link className="btn btn-success w-100 text-decoration-none" onClick={()=>toast.error('please fill address and reciepient details fess')}> Place Your Order </Link> :             <Link className="btn btn-success w-100 text-decoration-none" to='/Order'> Place Your Order </Link>


            }
          </div>
        </section>
        <section className="col-lg-5  shadow rounded p-4">
          {cart.length === 0 ? "" : <h5 className="fw-bold">Your order from</h5>}
          {cart.length === 0 && (
            <>
              <h2>No items </h2>
            </>
          )}
          <hr />
          {cart.map((cartItem) => {
            const { quantity, title, price, _id } = cartItem;
            return (
              <div
                className="row justify-content-between align-items-center border-bottom "
                key={_id}
              >
                {/* <hr /> */}

                <div className="col-7 ">
                  <p className="text-danger fw-bolder mt-2"> {title} </p>
                  <div className="p-2 rounded mb-3 qty-div  fs-4 d-flex justify-content-between align-items-center">
                    <button
                      className="btn  dec-btn  fs-5"
                      onClick={() => handleDecrease(cartItem)}
                    >
                      -
                    </button>
                    <span className=""> {quantity} </span>
                    <button
                      className="btn inc-btn fs-5"
                      onClick={() => handleIncrease(cartItem)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-4 ">
                  <div className="d-flex price-bin-div gap-3">
                    <span role="button" onClick={() => removeItem(_id)}>
                      <img src={binPic} alt="" />
                    </span>
                    <p>  </p>
                    {price}
                  </div>
                </div>
                {/* <div className=''>
                        </div> */}
              </div>
            );
          })}
          <div className="pt-5 fw-bold fs-4">
            {totalPrice === 0 ? (
              ""
            ) : (
              <div className="d-flex justify-content-between">
                <p className=""> Total: </p>
                <p className=""># {totalPrice} </p>
                {/* <div>
                </div> */}
              </div>
            )}
            <hr />
          </div>
        </section>
      </main>
    </>
  );
};

export default CheckOut;
