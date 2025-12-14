import React, { useState, useRef } from 'react';
import axios from 'axios';
import { UploadIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const FileUploadModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file selection from input
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Process selected files
  const handleFiles = (files) => {
    const fileArray = Array.from(files).filter(file => {
      const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExt = '.' + file.name.split('.').pop().toLowerCase();
      return validTypes.includes(fileExt) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });
    setSelectedFiles(fileArray);
    setMessage({ type: '', text: '' });
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Remove individual file from selection
  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  // Handle upload with axios
  const handleUpload = async () => {
    if (selectedFiles.length === 0 || loading) return;

    setLoading(true);
    setUploadProgress(0);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    
    // Append all selected files
    selectedFiles.forEach((file) => {
      formData.append('pdf', file);
    });

    try {
      const response = await axios.post(
        'http://localhost:3000/app/upload/pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );

      setMessage({ 
        type: 'success', 
        text: response.data.message || 'Files uploaded successfully!' 
      });
      
      // Clear success message and close modal after 2 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
        setSelectedFiles([]);
        onClose();
      }, 2000);

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Upload failed. Please try again.' 
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
      setSelectedFiles([]);
      setMessage({ type: '', text: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Upload Sources</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {/* Upload Icon */}
            <div className="flex flex-col items-center gap-3">
              <UploadIcon size={48} className="text-gray-400" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Click to upload
                  </button>
                  <span> or drag and drop</span>
                </p>
                <p className="text-xs text-gray-500">
                  PDF, TXT, DOC, DOCX (MAX. 10MB per file)
                </p>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleChange}
            />
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-900">
                Selected Files ({selectedFiles.length}):
              </h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {loading && (
            <div className='w-full mt-4'>
              <div className='flex justify-between text-sm text-gray-600 mb-1'>
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Uploading...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-blue-600 transition-all duration-300 ease-out'
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success/Error Message */}
          {message.text && (
            <div 
              className={`flex items-center gap-2 p-4 rounded-md w-full mt-4 ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <span className='text-sm font-medium'>{message.text}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || loading}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              selectedFiles.length > 0 && !loading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Uploading...
              </>
            ) : (
              <>
                Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
