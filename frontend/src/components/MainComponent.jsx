import React from 'react'
import UploadWrapper from './Upload/UploadWrapper'
import ChatWrapper from './Chat/ChatWrapper'

const MainComponent = ({ activeTab }) => {
  return (
    <div className='flex h-full overflow-hidden mb-3'>
      {/* Upload Sidebar - Desktop: 30% width, Mobile: conditional */}
      <div className={`
        ${activeTab === 'upload' ? 'block' : 'hidden'}
        lg:block lg:w-[30%] w-full lg:mr-0 mr-3 mt-3
      `}>
        <UploadWrapper />
      </div>

      {/* Chat Field - Desktop: 70% width, Mobile: conditional */}
      <div className={`
        ${activeTab === 'chat' ? 'block' : 'hidden'}
        lg:block lg:w-[70%] w-full mt-3
      `}>
        <ChatWrapper />
      </div>
    </div>
  )
}

export default MainComponent
