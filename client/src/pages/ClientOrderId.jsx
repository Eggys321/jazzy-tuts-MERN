import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ClientOrderId = () => {
  const [clientOrder, setClientOrder] = useState([]);
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = useParams();
  const token = localStorage.getItem("token");
  const fetchClientOrder = async () => {
    const fetcher = await fetch(
      `https://jazzy-mern.onrender.com/api/orders/${userId}`,
      {
        // method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await fetcher.json();
    console.log(response.orders);
    // console.log(response);
    setClientOrder(response.orders);
  };

  
  useEffect(() => {
    if (!loggedIn) {
      toast.error("unauthorized,please login/signup");
      navigate("/");
    }

    fetchClientOrder();
  }, []);
  return (
    <>
      <main className="py-4 ">
        {clientOrder && clientOrder.length >= 1 ? (
          <>
            {clientOrder.map((itx) => {
              return (
                <div key={itx._id} className="border">
                  {/* <h2> {itx.createdAt}</h2> */}
                  <p className="text-center">
                    <span className="fw-bold">order Id</span> {itx._id}
                  </p>
                  <h4> {itx.createdAt.slice(0,10)}, {itx.createdAt.slice(12,19)}</h4>
                  {/* <h2> {itx.createdAt.slice(12,19)}</h2> */}

                  <hr />
                  <h2> {itx.address.city} </h2>
                  <h2> {itx.address.housenumber} </h2>
                  <h2> {itx.address.street} </h2>
                  <hr />
                  <h3> {itx.recipient.email} </h3>
                  <h3> {itx.recipient.firstname} </h3>
                  <h3> {itx.recipient.lastname} </h3>
                  <h3> {itx.recipient.phonenumber} </h3>
                  <hr />
                  {itx.orderItems.map((its) => {
                    return (
                      <div key={its._id} className="">
                        <h4> {its.title} </h4>
                        <h4> {its.category} </h4>
                        {/* <h4> {its.description} </h4> */}
                        <h4> {its.price} </h4>
                        <h4> {its.quantity} </h4>
                        <img src={its.image} alt="" />
                        {/* <h3> {its.totalprice} </h3> */}
                      </div>
                    );
                  })}
                  <h1> Delivery status : Pending </h1>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <h2>no order </h2>
          </>
        )}
      </main>
    </>
  );
};

export default ClientOrderId;
