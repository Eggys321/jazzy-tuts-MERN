import React from "react";
import supportLogo from "../assets/two-4-7logo.svg";
import percentLogo from "../assets/percentLogo.svg";
import appleImg from '../assets/apple img.svg';
import googleImg from '../assets/google image.svg'

const Footer = () => {
  return (
    <>
      <footer className="bg-black container p-5">
        <main className="text-white   text-center">
          {/* section-1 */}
          <section className="d-lg-flex justify-content-between ">
              {/* parent div */}
            <div className="flex-column-reverse flex-lg-row d-flex  mb-5">
              {/* div for 24/7 text and logo */}
              <div className="d-lg-flex">
                <img src={supportLogo} alt="24/7 logo" />
                <div className="">

                <h2 className="text-lg-center ms-2 fs-2  ">
                  
                24/7 
                </h2>
                <p>Support</p>
                </div>
              </div>
              {/* div for 100% text and logo */}
              <div className="d-lg-flex justify-content-center align-items-center mx-5">
                <img src={percentLogo} alt="24/7 logo" className="" />
                <div className="ms-1 ">

                <h2 className="text-lg-center ">
                  
                  100% 
                </h2>
                <p>Payment Secured</p>
                </div>
              </div>
            </div>
            {/* parent div for apple and google logo */}
            <div className="d-lg-flex gap-4">
                {/* div for appleImg  */}
                <div className="w-75 mx-auto mb-4">

                <img src={appleImg} alt="apple image" className="img-fluid" />
                </div>
                {/* div for googleImg  */}
                <div className="w-75 mx-auto">

                <img src={googleImg} alt="google image" className="img-fluid" />
                </div>
            </div>
          </section>
          {/* section-2 */}
          <section className="text-lg-start ">
            <h4>Need Help</h4>
            <p><span className="text-decoration-underline fw-bold">+234 907 466 6655</span> <span>or</span></p> 
            <p className="text-decoration-underline fw-bold">help@jazzysburger.com</p>

            <div>
              <h3>FOLLOW US</h3>
              <div>
                
              </div>
            </div>
          </section>
        </main>
      </footer>
      <p className="text-center">&copy; JJB Concepts <span className="fw-bolder fs-3 "> . </span> Developed by our Digital LLC </p>
    </>
  );
};

export default Footer;
