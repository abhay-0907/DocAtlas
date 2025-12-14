import React, { useState } from 'react'
import { FaFileUpload } from 'react-icons/fa';
import { GoPlus } from "react-icons/go";

import FileUploadModal from './FileUploadModal'
import TextPasteBox from './TextPasteBox';
const Upload = () => {
    const[isOpen,setIsOpen] = useState(false)
  return (
    <div className='w-full h-auto  text-white'>
        <div className='flex justify-center px-4 py-2 border-b '>
            <h3 className='text-2xl'>
                Sources
            </h3>
        </div>

        <div className='p-2 '>
            <button onClick={()=>setIsOpen(!isOpen)} className='w-full flex justify-center items-center text-xl border rounded-full hover:bg-[#a79ced] hover:text-[#141616] cursor-pointer py-2 gap-2'>
                <GoPlus size={25} className='mt-0.5'/>Add Sources
            </button >
        </div>
        <FileUploadModal isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
        <TextPasteBox/>
    </div>
  )
}

export default Upload