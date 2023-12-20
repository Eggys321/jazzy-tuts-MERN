import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Main from '../components/Main'
import Products from '../components/Products'

const Home = () => {
    useEffect(()=>{
        document.title = 'Home | Page'
    })
  return (
    <>
    <main className='container'>
      <Hero/>
      <Products/>
      {/* <Main/> */}
    </main>
    </>
  )
}

export default Home