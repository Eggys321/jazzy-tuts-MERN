import React, { useContext } from "react";
import useFetch from "../customHook/UseFetch.jsx";
import jazzyPic from "../assets/image 4.jpg";
import Loader from "../utils/Loader";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import heartImg from '../assets/Component 1.jpg';
import cheeseImg from '../assets/image 5.jpg';
import onionImg from '../assets/image 6.jpg';
import lettuceImg from '../assets/image 7.jpg';
import breadImg from '../assets/image 8.jpg';
import eggImg from '../assets/image 9.jpg';
import '../styles/Product.css';
import { ToastContainer, toast } from "react-toastify";
import CartContext from "../context/CartContext";


const Products = () => {

  const { data, loading, error } = useFetch(
    "https://jazzy-mern.onrender.com/api/products"
  );
  const {handleAddToCart,handleIncrease} = useContext(CartContext)
  console.log(data);
  //   console.log(error);
  const notify = () => {
    toast("An item has been added",{
      position:toast.POSITION.TOP_CENTER
    });
  };
  return (
    <>
      <main className="my-5 row">
      <div className="d-none d-lg-block col-lg-3 ">
        <img src={jazzyPic} alt="jazzys pic" className="w-100 h-100" />
      </div>
      <div className="col-sm-12 col-lg-9">
      {loading ? <Loader /> : (
        
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          {data.map((datum) => {
            const { _id, title, image, description, price,quantity } = datum;
            return (
              <Card  key={_id} className="rounded-4 card-inner position-relative card-hover ">
                <Card.Img variant="top" src={image} className="w-100 " />
                <Card.Img variant="top" src={heartImg} className="w-25 position-absolute top-0 end-0 rounded-pill p-3"  />
                <Card.Body>
                  <Card.Title className="fs-6"> {title} </Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="fs-5">
                    <span className="fw-lighter"> Total Price </span>
                    <br />
                    <span className="fw-bold"># {price}.0</span>
                  </Card.Text>
                  {/* <p> {quantity} * {price} </p> */}
                  {/* <button className="btn btn-primary" onClick={()=>handleAddToCart(datum)}>
                    add
                  </button> */}
                  <div className="d-flex gap-2 h-25 justify-content-center align-items-center">
                  {/* <Button className="h-50"> - </Button>
                  <h2>1</h2>
                  <Button className="h-50"> + </Button> */}
                  </div>

                  </div>
                  <div className="my-3 d-flex justify-content-between">
                    <Card.Img variant="botto" src={cheeseImg} />
                    <Card.Img variant="botto" src={onionImg} />
                    <Card.Img variant="botto" src={lettuceImg} />
                    <Card.Img variant="botto" src={breadImg} />
                    <Card.Img variant="botto" src={eggImg} />
                    </div>
                  <Button variant="danger" className="w-100" onClick={()=>{handleAddToCart(datum);notify()}}>
                    Add to Cart
                  </Button>
                  <ToastContainer/>

                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) }

      </div>
    </main>
    </>
  );
};

export default Products;
