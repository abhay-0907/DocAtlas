import React from 'react'
import HeroSection from './HeroSection'
import About from './Features'
import HowItWorks from './HowItWorks'
import Features from './Features'

const LandinPageWrapper = () => {
  return (
    <div className='text-white'>
        <HeroSection/>
      <Features/>
        <HowItWorks/>
    </div>
  )
}

export default LandinPageWrapper