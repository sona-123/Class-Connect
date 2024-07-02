"use client";
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { app } from '../../../../../firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react'; // Import the Trash icon from Lucide

const FileList = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    try {
      const filesCollection = collection(db, "users", user.id, "files");
      const q = query(filesCollection);
      const querySnapshot = await getDocs(q);
      
      const filesData = [];
      querySnapshot.forEach((doc) => {
        filesData.push({ ...doc.data(), id: doc.id });
      });
      
      setFiles(filesData);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileClick = (file) => {
    router.push(file.fileUrl);
  };

  const handleFileDelete = async (fileId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this file?');
      if (confirmDelete) {
        const docRef = doc(db, "users", user.id, "files", fileId);
        await deleteDoc(docRef);
        setFiles(files.filter(file => file.id !== fileId));
        console.log('File deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-2xl text-center mb-5 font-bold'>
        Uploaded <span className='text-primary'>Files</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.id}>
                <td className="px-6 py-4 cursor-pointer" onClick={() => handleFileClick(file)}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 overflow-hidden overflow-ellipsis">{file.fileName}</p>
                      <p className="text-xs text-gray-500">{file.fileSize} bytes | {file.fileType}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-8">
                    <Link href={`/files-preview/${file.id}`}>
                      <span className="text-blue-500 hover:text-blue-600 cursor-pointer">Preview</span>
                    </Link>
                    <Trash
                      className="h-4 w-4  text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() => handleFileDelete(file.id)}
                      title="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
