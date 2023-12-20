import React from 'react';
import heroImg from '../assets/image 3.jpg';
import '../styles/Hero.css'

const Hero = () => {
  return (
    <>
    <main className='my-3 '>
        <img src={heroImg} alt="hero-image" className='img-fluid w-100 hero-img ' />
    </main>
    </>
  )
}

export default Hero