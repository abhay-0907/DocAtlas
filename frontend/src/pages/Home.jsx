import React from 'react'
import HeaderWrapper from '../components/Header/HeaderWrapper'
import LandinPageWrapper from '../components/LandingPage/LandinPageWrapper'
const Home = () => {
  return (
    <div className='bg-[#141616] max-w-screen font-[InterRegular24] min-h-screen'>
       <div className='fixed w-full h-auto z-50 top-0 shadow-md'>
         <HeaderWrapper/>
       </div>
       <div className='pt-18'>
         <LandinPageWrapper/>
       </div>
    </div>
  )
}

export default Home