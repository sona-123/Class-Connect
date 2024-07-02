"use client"
import React, { useState, useEffect } from 'react';
import AlertMessage from './AlertMessage';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';


export default function UploadForms({ uploadBtnClick, progress }) {
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const onFileSelect = (file) => {
    console.log(file);
    if (file && file.size > 2000000) {
      console.log("Size is Greater than 2 MB");
      setErrorMsg('Maximum Size should be 2MB');
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };




 

  return (
    <div className='text-center'>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-blue-100 dark:hover:bg-blue-200 dark:bg-white-700 hover:bg-white-100 dark:border-white-600 dark:hover:border-white-500 dark:hover:bg-white-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-blue-500 dark:text-white-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-md text-white-500 dark:text-black-400"><span className="font-semibold">Click to upload</span> or <strong className='text-primary'>drag</strong> and <strong className='text-primary'>drop</strong></p>
            <p className="text-xs text-black-500 dark:text-black-400">SVG, PNG, JPG or GIF (MAX Size 2 MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={(event) => onFileSelect(event.target.files[0])} />
        </label>
      </div>

      {errorMsg && <AlertMessage message={errorMsg} />}
      {file && <FilePreview file={file} removeFile={() => setFile(null)} />}

      {progress > 0  ? <ProgressBar progress={progress} /> :
        <button disabled={!file || uploadComplete} className='p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-200'
          onClick={() => uploadBtnClick(file)}>
          Upload
        </button>
      }
      



      
    </div>
  );
}
