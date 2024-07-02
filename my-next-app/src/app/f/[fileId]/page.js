"use client"
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../../firebaseConfig';
import FileItem from "../[fileId]/_componenets/fileItem"
import Link from 'next/link';
import Image from 'next/image';
export default function FileView({ params }) {
  const db = getFirestore(app);
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    if (params.fileId) {
      getFileInfo(params.fileId);
    }
  }, [params.fileId]);

  const getFileInfo = async (fileId) => {
    const docRef = doc(db, "uploadedFile", fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFileInfo(docSnap.data());
    } else {
      console.log("No such document");
    }
  };

  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center 
    items-center flex-col gap-4'>
      <Link href='/'>
      <div className="flex items-center p-0">
        <Image src="/logo.svg" width={80} height={20} className="block" />
        <h1 className="ml-2 text-2xl font-bold text-gray-700 block">EncryShare</h1>
      </div>
      </Link>
     <FileItem file={fileInfo}/>
    </div>
  );
}
