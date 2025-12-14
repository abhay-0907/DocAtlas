import React, { useState } from 'react'
import HeaderWrapper from '../components/Header/HeaderWrapper'
import UploadWrapper from '../components/Upload/UploadWrapper'
import ChatWrapper from '../components/Chat/ChatWrapper'
import MainComponent from '../components/MainComponent'

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className='max-w-screen flex flex-col overflow-clip h-screen bg-[#141616] font-[InterRegular18]'>
      <HeaderWrapper/>
      
      {/* Mobile Tab Selector - Only visible on mobile */}
      <div className="lg:hidden flex border-b border-gray-700 bg-[#1e2020]">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-sm font-medium transition ${
            activeTab === 'chat'
              ? 'text-blue-400 border-b-2 border-blue-400 bg-[#252828]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          role="tab"
          aria-selected={activeTab === 'chat'}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-3 text-sm font-medium transition ${
            activeTab === 'upload'
              ? 'text-blue-400 border-b-2 border-blue-400 bg-[#252828]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          role="tab"
          aria-selected={activeTab === 'upload'}
        >
          File Upload
        </button>
      </div>

      <MainComponent activeTab={activeTab} />
    </div>
  )
}

export default Index
