import React, { useEffect, useState } from "react";
import jazzyPic from "../assets/image 4.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import './styles/Main.css';
import Spinner from 'react-bootstrap/Spinner';
import heartImg from '../assets/Component 1.jpg';
import cheeseImg from '../assets/image 5.jpg';
import onionImg from '../assets/image 6.jpg';
import lettuceImg from '../assets/image 7.jpg';
import breadImg from '../assets/image 8.jpg';
import eggImg from '../assets/image 9.jpg';


const Main = () => {
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  const getFetchedData = async () => {
    const dataUrl = "https://eggys.onrender.com/jazzyburger/all";
    // fetch("https://eggys.onrender.com/jazzyburger/all")
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
    try {
      const fetchedData = await fetch(dataUrl);
      const response = await fetchedData.json();
      console.log(response);
      setData(response);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data);

  useEffect(() => {
    getFetchedData();
  }, []);
  return (
    <main className="my-5 row">
      <div className="d-none d-lg-block col-lg-3 ">
        <img src={jazzyPic} alt="jazzys pic" className="w-100 h-100" />
      </div>
      <div className="col-sm-12 col-lg-9">
      {isLoading ? <Spinner animation="border" /> : (
        
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
          {data.map((datum) => {
            const { _id, title, image, description, price } = datum;
            return (
              <Card  key={_id} className="rounded-4 card-inner position-relative card-hover ">
                <Card.Img variant="top" src={image} className="w-100 " />
                <Card.Img variant="top" src={heartImg} className="w-25 position-absolute top-0 end-0 rounded-pill p-2"  />
                <Card.Body>
                  <Card.Title className="fs-6"> {title} </Card.Title>
                  <Card.Text className="fs-5">
                    <span className="fw-lighter"> Total Price </span>
                    <br />
                    <span className="fw-normal"># {price}.0</span>
                  </Card.Text>
                  <div className="my-3 d-flex justify-content-between">
                    <Card.Img variant="botto" src={cheeseImg} />
                    <Card.Img variant="botto" src={onionImg} />
                    <Card.Img variant="botto" src={lettuceImg} />
                    <Card.Img variant="botto" src={breadImg} />
                    <Card.Img variant="botto" src={eggImg} />
                    </div>
                  <Button variant="danger" className="w-100">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) }

{/* <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
          {data.map((datum) => {
            const { _id, title, image, description, price } = datum;
            return (
              <Card  key={_id} className="rounded-4 card-inner position-relative card-hover ">
                <Card.Img variant="top" src={image} className="w-100 " />
                <Card.Img variant="top" src={heartImg} className="w-25 position-absolute top-0 end-0 rounded-pill p-2"  />
                <Card.Body>
                  <Card.Title className="fs-6"> {title} </Card.Title>
                  <Card.Text className="fs-5">
                    <span className="fw-lighter"> Total Price </span>
                    <br />
                    <span className="fw-normal"># {price}.0</span>
                  </Card.Text>
                  <div className="my-3 d-flex justify-content-between">
                    <Card.Img variant="botto" src={cheeseImg} />
                    <Card.Img variant="botto" src={onionImg} />
                    <Card.Img variant="botto" src={lettuceImg} />
                    <Card.Img variant="botto" src={breadImg} />
                    <Card.Img variant="botto" src={eggImg} />
                    </div>
                  <Button variant="danger" className="w-100">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div> */}

      </div>
    </main>
  );
};

export default Main;
