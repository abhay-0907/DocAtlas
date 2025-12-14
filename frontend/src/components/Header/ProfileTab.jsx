import React, { useState,useEffect,useRef } from 'react'
import { VscAccount } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";


const ProfileTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  return (
    <div className='text-white' ref={dropdownRef}>
        <button onClick={()=>setIsOpen(!isOpen)} className='text-xl font-bold bg-[#a79ced] text-[#141616] px-4 py-2 border rounded-full'>
            U
        </button>
        {isOpen && 
            <div className='absolute w-55 bg-[#141616] right-10 rounded-md mt-1 border'>
               <div className='text-sm border-b p-3'>
                 <p>John Doe</p>
                 <p>example@gmail.com</p>
               </div>
                <div className='flex flex-col justify-center gap-2 text-lg'>
                    <span className='inline-flex justify-start items-center gap-2 hover:text-[#141616]
                    hover:bg-[#a79ced] px-2 mt-3'><VscAccount/><p>Profile</p></span>
                    <span className='inline-flex justify-start items-center gap-2 hover:text-[#141616]
                    hover:bg-[#a79ced] px-2 my-1 ' ><IoWalletOutline/><p>Wallet</p></span>
                    <span className='inline-flex justify-start items-center gap-2 hover:text-[#141616]
                    hover:bg-[#a79ced] px-2 mb-3'><MdLogout/><p>Logout</p></span>
                </div>
            </div>
        }
    </div>
  )
}

export default ProfileTab