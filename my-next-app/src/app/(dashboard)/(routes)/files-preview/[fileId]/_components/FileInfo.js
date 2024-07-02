import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Ensure this import is correct

export default function FileInfo({ file }) {
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    if (file) {
      setFileType(file.fileType.split('/')[0]);
    }
  }, [file]);

  return file ? (
    <div className='text-center border
     flex justify-center m-4 flex-col items-center p-2 rounded border-blue-200'>
      <Image 
        src={fileType == 'image' ? file?.fileUrl : '/file.jpeg '}
        width={200}
        height={200}
        className='h-[200px] rounded-md object-contain'
        alt={file.fileName}
      />
      <div className='mt-2'>
        <h2>{file.fileName}</h2>
        <h2 className='text-gray-400 text-[13px]'>{file.fileType}/{file.id}</h2>
      </div>
    </div>
  ) : null;
}
