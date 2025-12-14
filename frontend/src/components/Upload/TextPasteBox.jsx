import React, { useState } from 'react'

const TextPasteBox = () => {
    const [text, setText] = useState('');
  return (
    <div>
         <div className='flex-1 overflow-y-auto px-4 mt-4'>
            <div>
                <h1 className='text-xl font-medium mb-2'>
                    Paste-text
                </h1>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your text here"
                    className="w-full text-white h-48 px-4 py-3 text-justify border border-white rounded-xl resize-none overflow-y-auto focus:outline-none"
                    style={{
                        scrollbarWidth: "thin",
                    }}
                />
                <button onClick={()=>setIsOpen(!isOpen)} className='w-full flex justify-center items-center text-xl border rounded-full hover:bg-[#a79ced] hover:text-[#141616] cursor-pointer py-2 gap-2'>Upload Text</button >
            </div>
        </div>
    </div>
  )
}

export default TextPasteBox