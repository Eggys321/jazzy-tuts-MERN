import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import Main from '../components/Main'
import Products from '../components/Products';
import AuthContext from '../context/AuthContext';


const Home = () => {
  const {shown,setShown} = useContext(AuthContext)
  function doSth(){
    if(shown === true){
      setShown(false)

    }
  }
    useEffect(()=>{
        document.title = 'Home | Page'

    })
  return (
    <>
    <main className='container' onMouseEnter={doSth}>
      <Hero/>
      <Products/>
      {/* <Main/> */}
    </main>
    </>
  )
}

export default Home