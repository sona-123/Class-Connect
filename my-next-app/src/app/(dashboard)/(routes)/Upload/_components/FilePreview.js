import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
export default function FilePreview({file,removeFile}) {
  return (
    <div className='flex items-center gap-4 w-fit justify-between mt-5 border rounded-md p-4 border-blue-400'>
      <Image src='/file.jpeg' width={50}
      height={50} alt='file'/>
      <div className='text-left'>
        <h2>{file.name}</h2>
        <h2 className='text-{12px} text-gray-400'>{file?.type}/{(file.size/1024/1024).toFixed(2)}MB</h2>
      </div>
      <X className='text-red-500 cursor-pointer' onClick={()=>removeFile()}/>
    </div>
  )
}
