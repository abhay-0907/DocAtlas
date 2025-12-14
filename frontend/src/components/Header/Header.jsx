import React from 'react'
import { MdDragIndicator } from "react-icons/md";
import ProfileTab from './ProfileTab';

const Header = () => {
  return (
    <header>
        <div className='flex items-center justify-between px-4 py-3 border-[#a79ced]'>
            <div className='flex text-[#a79ced] items-center justify-center '>
                <MdDragIndicator size={38}/>
                <h1 className=' text-4xl font-black '>
                    DocAtlas 
                </h1>
            </div>
            
            <ProfileTab/>
        </div>
    </header>
  )
}

export default Header