import React from 'react'

import { LuBrain } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdOutlineChat } from "react-icons/md";

const Features = () => {
    const items = [
        {
            
            id:1,
            logo:<LuBrain size={40}/>,
            title:"Intelligent Understanding",
            des:"Our AI deeply comprehends context and nuance, delivering answers that truly match your intent."
        },
        {
            id:2,
            logo:<MdOutlineChat size={40}/>,
            title:"Natural Conversations",
            des:"Ask questions in plain English and get comprehensive, contextual answers instantly."
        },
        {
            id:3,
            logo:<BsLightningCharge size={40}/>,
            title:"Lightning Fast",
            des:"Get accurate responses in milliseconds, powered by optimized vector databases and caching."
        },
        {
            id:4,
            logo:<HiOutlineDocumentSearch size={40}/>,
            title:"Smart Document Search",
            des:"Search across thousands of documents instantly with semantic understanding, not just keywords."
        }
    ];
  return (
    <div className='w-full min-h-screen mb-20 pt-20'>
        <div className='my-8 flex flex-col items-center justify-center '>
            <h3 className='text-5xl max-w-2xl text-center leading-tight'>
                Everything you need for 
                
                <span className='text-[#a79ced]'> Intelligent Retrieval </span>
            </h3>
            <p className='mt-5 text-xl text-gray-400 max-w-2xl text-center'>
                Powerful features designed to transform how you interact with your knowledge base.
            </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto'>
            {items.map((item) => (
                <div key={item.id} className='flex flex-col border shadow-2xl shadow-[#a79ced]/10  rounded-xl border-[#a79ced] mt-4 p-5 justify-center mx-3'>
                    <div className='inline-flex text-[#a79ced]'>
                        {item.logo}
                    </div>
                    <h3 className='text-3xl mt-3 font-bold'>{item.title}</h3>
                    <p className='mt-2 text-lg text-gray-400 '>
                        {item.des}
                    </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Features