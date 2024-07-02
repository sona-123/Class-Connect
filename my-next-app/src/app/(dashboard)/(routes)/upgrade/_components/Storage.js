"use client"
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import CircularProgress from './CircularProgress';
import {app} from "../../../../../../firebaseConfig"; // Adjust the path to your firebaseConfig file
import { useUser } from '@clerk/nextjs';

const db = getFirestore(app);
const auth = getAuth(app);

const StorageUsage = () => {
  const [usedSpace, setUsedSpace] = useState(0);
  const totalSpace = 15 * 1024 * 1024; // 15 MB in bytes
  const [userId, setUserId] = useState(null);
const {user}=useUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.id);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      if (userId) {
        const filesCollection = collection(db, 'uploadedFile');
        const q = query(filesCollection, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        let totalUsedSpace = 0;

        querySnapshot.forEach((doc) => {
          totalUsedSpace += doc.data().fileSize;
        });

        setUsedSpace(totalUsedSpace);
      }
    };

    fetchFiles();
  }, [userId]);

  if (user === null) {
    return <p>Please log in to see your storage usage.</p>;
  }

  return (
    <div className="flex justify-center items-center ">
      <CircularProgress usedSpace={usedSpace} totalSpace={totalSpace} />
    </div>
  );
};

export default StorageUsage;
