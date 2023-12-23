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

const CheckOut = () => {
  const [show, setShow] = useState(false);
  const {shown,setShown,loggedIn} = useContext(AuthContext)
  const [modalShow, setModalShow] = useState(false);
  const [modalAddress,setModalAddress] = useState(false)
  const { cart, removeItem, totalPrice, handleIncrease, handleDecrease } =
    useContext(CartContext);
    const recipient = JSON.parse(localStorage.getItem("recipient"));
  const address = JSON.parse(localStorage.getItem("address"));

  console.log(cart);
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
      <main className="my-5 container row justify-content-between" onMouseEnter={doSth}>
        <section className="col-lg-6 border border-3 rounded p-4 h-50">
          <h2>Review and place order </h2>
          <p className="mt-4">
            Review / Add address and fulfill payments to complete your purchase
          </p>
          <hr />
          <div>
            <h5>Recipient information</h5>
            <Button variant="" className="bg-dark outline-none text-light w-50" onClick={() => setModalShow(true)}>
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
            <Button variant="" className="bg-dark outline-none text-light w-50" onClick={() => setModalAddress(true)}>
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
        <section className="col-lg-5 border border-3 rounded p-4">
          <h5>Your order from</h5>
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
                className="row justify-content-between align-items-center "
                key={_id}
              >
                {/* <hr /> */}

                <div className="col-5 ">
                  <h2 className="fs-6 text-danger"> {title}... </h2>
                  <p className=""> </p>
                  <div className="bg-secondary w-75 ">
                    <button
                      className="btn btn-lg"
                      onClick={() => handleIncrease(cartItem)}
                    >
                      +
                    </button>
                    {quantity}
                    <button
                      className="btn btn-lg"
                      onClick={() => handleDecrease(cartItem)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <p className="col-4">
                  <div className="d-flex gap-3">
                    <span role="button" onClick={() => removeItem(_id)}>
                      <img src={binPic} alt="" />
                    </span>
                    {price}
                  </div>
                </p>
                {/* <div className=''>
                        </div> */}
              </div>
            );
          })}
          <div>
            {totalPrice === 0 ? (
              ""
            ) : (
              <div className="d-flex justify-content-between">
                <p> Items Subtotal </p>
                <p># {totalPrice} </p>
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
