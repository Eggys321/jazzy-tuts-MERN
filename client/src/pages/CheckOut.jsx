import React, { useContext, useEffect,useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CartContext from '../context/CartContext';
import binPic from '../assets/bin-img.svg'

const CheckOut = () => {
    const [show, setShow] = useState(false);
    const {cart,removeItem, totalPrice,handleIncrease,handleDecrease } = useContext(CartContext)
    console.log(cart);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    useEffect(()=>{
        document.title = 'Check out | Page'
    })
  return (
    <>
      <main className="my-5 container row justify-content-between">
        <section className="col-lg-6 border border-3 rounded p-4 h-50">
          <h2>Review and place order </h2>
          <p className="mt-4">
            Review / Add address and fulfill payments to complete your purchase
          </p>
          <hr />
          <div>
          <h5>Recipient information</h5>
          <Button variant="" onClick={handleShow} className='bg-dark outline-nonem text-light w-50'>
            Add Recipient
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
          <hr />
          {/* Delivery Address */}
          <div>
          <h5>Delivery Address</h5>
          <Button variant="" onClick={handleShow} className='bg-dark outline-nonem text-light w-50'>
            Add Delivery Address
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <hr />
          <button className="btn btn-success w-100">Place Your Order</button>
          </div>
        </section>
        <section className='col-lg-5 border border-3 rounded p-4'>
            <h5>Your order from</h5>
            {cart.length === 0 && <><h2>No items </h2> </>}
            <hr />
            {cart.map((cartItem) => {
              const { quantity, title, price, _id } = cartItem;
              return (
                <div
                  className="row justify-content-between align-items-center "
                  key={_id}
                >
                  {/* <hr /> */}

                  <div className='col-5 '>
                  <h2 className="fs-6 text-danger"> {title}... </h2>
                  <p className="">  </p>
                  <div className='bg-secondary w-75 '>
                    <button className="btn btn-lg" onClick={()=>handleIncrease(cartItem)}>
                      +
                    </button>
                    {quantity}
                    <button className="btn btn-lg" onClick={()=>handleDecrease(cartItem)}>
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
}

export default CheckOut