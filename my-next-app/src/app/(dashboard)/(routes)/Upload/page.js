"use client";
import React, { useEffect, useState } from 'react';
import UploadForms from './_components/UploadForms';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../../../firebaseConfig/firebaseConfig';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import {generateRandomString} from '../../../_utils/GenerateRandomString';
import SuccesMessage from './_components/SuccesMessage';
import { useRouter } from 'next/navigation';

export default function Upload() {
  const storage = getStorage(app);
  const db = getFirestore(app);
  const [fileDocId, setFileDocId] = useState();
  const { user } = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const uploadFile = (file) => {
    if (!file) {
      console.error("No file selected for upload");
      return;
    }

    const metadata = {
      contentType: file.type,
    };

    const storageRef = ref(storage, `file-upload/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
        if (progress === 100) {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File is available at ', downloadURL);
            saveInfo(file, downloadURL);
          });
        }
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        console.log('Upload successful');
      }
    );
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString();
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: fileUrl,
      userEmail: user.primaryEmailAddress.emailAddress,
      userName: user.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.BASE_URL +"f/"+  docId,
    });
    setFileDocId(docId);
  };

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setUploadComplete(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress==100]);

  useEffect(() => {
    if (uploadComplete) {
      const timer = setTimeout(() => {
        router.push('/files-preview/' + fileDocId);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [uploadComplete==true]);

  
  return (
    <div className='p-5 px-8 md:px-28'>
      {progress === 100 ? <SuccesMessage /> : null}
      <h2 className='text-[20px] text-center m-5'>
        Start <strong className='text-primary'>Uploading</strong> Files and <strong className='text-primary'>Share</strong> it
      </h2>
      <UploadForms
        uploadBtnClick={(file) => uploadFile(file)}
        progress={progress}
      />
    </div>
  );
}

