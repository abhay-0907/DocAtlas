import React from 'react'
import { FiUpload } from "react-icons/fi";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineMarkChatRead } from "react-icons/md";
import '../../App.css'
const HowItWorks = () => {
  const steps = [
    {
      id:1,
      title:"Upload Documents",
      logo:<FiUpload size={40}/>,
      des:"Simply drag and drop your documents - PDFs, Word files, or connect your existing data sources."
    },
    {
      id:2,
      title:"AI Processing",
      logo:<HiOutlineCpuChip size={40}/>,
      des:"Our AI analyzes, chunks, and creates intelligent embeddings from your content automatically."
    },
    {
      id:3,
      title:"Semantic Search",
      logo:<IoIosSearch size={40}/>,
      des:"Advanced vector search finds the most relevant information based on meaning, not just keywords."
    },
    {
      id:4,
      title:"Get Answers",
      logo:<MdOutlineMarkChatRead size={40}/>,
      des:"Ask questions naturally and receive accurate, contextual answers with source citations."
    }];
  return (
    <div className='w-full min-h-screen 
    '>
      <div className='flex justify-center mt-20 '>
        <h1 className='text-6xl'>
            How It <span className='text-[#a79ced]'>Works</span>
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto mt-15'>
        {steps.map((item,index)=>(
          <div className='border mt-5 mx-3 px-6 border-[#a79ced] shadow-2xl shadow-[#a79ced]/5 rounded-xl'>
            <div className='flex flex-col items-center justify-center mt-12'>
              
               <div className='flex flex-col items-center justify-center gap-2 text-2xl'>
                <span className='text-[#a79ced]'>{item.logo}</span>
                <h4>{item.id}</h4>
                <p>{item.title}</p>
               </div>
            </div>
            <div className='flex justify-center mt-4 mb-8'>
                <p className='text-lg text-center text-gray-400'>
                    {item.des}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks