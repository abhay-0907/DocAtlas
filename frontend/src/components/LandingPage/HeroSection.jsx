import React from 'react'
import { RiSparkling2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { SparklesCore } from '../ui/Sparkles';
const HeroSection = () => {
  return (
    <div className='min-h-screen flex flex-col items-center w-full '>
        <div className=' flex justify-center mt-15 '>
            <div className='flex mt-4 border px-4 py-2 gap-1 items-center-safe
             rounded-3xl font-bold text-xl border-[#a79ced] ] shadow-2xl shadow-[#a79ced]/15'>
                <RiSparkling2Line/>
                <span>
                    Powered By AI.
                </span>
            </div>
            <div>
                <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
            </div>
        </div>

        <div className='flex flex-col justify-center  mt-10'>
            <div className='max-w-4xl mx-auto text-center'>
                <h1 className='text-6xl'>
                    Unlock Knowledge with 
                </h1>
                <span className='text-white text-8xl '>'DocAtlas'</span>
               <div className='w-full mt-5 leading-tight text-gray-400 text-2xl'>
                 <p>
                    Transform how you search, analyze, and retrieve information from your documents with our AI-powered Retrieval-Augmented Generation platform.
                </p>
               </div>
            </div>
            <div className='w-full flex  justify-center mt-15'>
                <Link to='/app' className='border text-2xl px-7 py-3 rounded-full  text-white '>
                    Try DocAtlas
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default HeroSection