// "use client"
// import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
// import React, { useEffect,useState } from 'react'
// import { app } from '../../../../../../firebaseConfig';
// import FileInfo from './_components/FileInfo';
// import FileShareForm from './_components/FileShareForm';
// import Link from 'next/link';
// import { ArrowLeftSquare } from 'lucide-react';
// export default function FilePreview({ params }) {
//   const db = getFirestore(app);
//   const [fileInfo, setFileInfo] = useState();

//   useEffect(() => {
//     if (params?.fileId) {
//       getFileInfo(params.fileId);
//     }
//   }, [params]);

//   const getFileInfo = async (fileId) => {
//     const docRef = doc(db, "uploadedFile", fileId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//       setFileInfo(docSnap.data());
//     } else {
//       console.log("No such document");
//     }
//   };

//   const onPasswordSave = async(password) => {
//     // Implement the password save functionality here
//     const docRef=doc(db,"uploadedFile",params?.fileId);
//     await updateDoc(docRef,{
//       password:password
//     });
//     console.log('Password saved:', password);
//   };

//   return (
//     <div className='py-10 px-20'>
//       <Link href='/Upload' className='flex gap-3'>
//         <ArrowLeftSquare /> Go to upload
//       </Link>
//       <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
//         {fileInfo && (
//           <>
//             <FileInfo file={fileInfo} />
//             <FileShareForm file={fileInfo} 
//             onPasswordSave={(password)=>onPasswordSave(password)} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../../../../firebaseConfig';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';
import Link from 'next/link';
import { ArrowLeftSquare } from 'lucide-react';
import { useUser } from '@clerk/nextjs'; // Import useUser hook from Clerk

export default function FilePreview({ params }) {
  const db = getFirestore(app);
  const { user } = useUser(); // Fetch current user using useUser hook
  const [fileInfo, setFileInfo] = useState(null); // Initialize fileInfo with null

  useEffect(() => {
    if (params?.fileId && user) {
      getFileInfo(params.fileId);
    }
  }, [params, user]);

  const getFileInfo = async (fileId) => {
    try {
      const docRef = doc(db, "users", user.id, "files", fileId); // Adjusted path to fetch user-specific file
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFileInfo(docSnap.data());
      } else {
        console.log("No such document");
        setFileInfo(null); // Set fileInfo to null if document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      setFileInfo(null); // Set fileInfo to null on error
    }
  };

  const onPasswordSave = async (password) => {
    try {
      if (!fileInfo) {
        console.error("No file info available to update password.");
        return;
      }

      const docRef = doc(db, "users", user.id, "files", params?.fileId); // Adjusted path to update user-specific file
      await updateDoc(docRef, {
        password: password
      });
      console.log('Password saved:', password);
      // Update local state with new password (optional)
      setFileInfo(prevFile => ({
        ...prevFile,
        password: password
      }));
    } catch (error) {
      console.error("Error updating password:", error);
    }
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
            <FileShareForm file={fileInfo} onPasswordSave={(password) => onPasswordSave(password)} />
          </>
        )}
      </div>
    </div>
  );
}
