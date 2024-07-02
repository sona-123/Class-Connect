"use client"
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect,useState } from 'react'
import { app } from '../../../../../../firebaseConfig';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';
import Link from 'next/link';
import { ArrowLeftSquare } from 'lucide-react';
export default function FilePreview({ params }) {
  const db = getFirestore(app);
  const [fileInfo, setFileInfo] = useState();

  useEffect(() => {
    if (params?.fileId) {
      getFileInfo(params.fileId);
    }
  }, [params]);

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

  const onPasswordSave = async(password) => {
    // Implement the password save functionality here
    const docRef=doc(db,"uploadedFile",params?.fileId);
    await updateDoc(docRef,{
      password:password
    });
    console.log('Password saved:', password);
  };

  return (
    <div className='py-10 px-20'>
      <Link href='/Upload' className='flex gap-3'>
        <ArrowLeftSquare /> Go to upload
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
        {fileInfo && (
          <>
            <FileInfo file={fileInfo} />
            <FileShareForm file={fileInfo} 
            onPasswordSave={(password)=>onPasswordSave(password)} />
          </>
        )}
      </div>
    </div>
  );
}