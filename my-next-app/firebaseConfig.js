import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAmVbB9S0f5NE0T1h6Ciy8rHodJyYnPIrY",
    authDomain: "encryshare-7ab6b.firebaseapp.com",
    projectId: "encryshare-7ab6b",
    storageBucket: "encryshare-7ab6b.appspot.com",
    messagingSenderId: "738236375508",
    appId: "1:738236375508:web:728e6420f3c6ef4a733641",
    measurementId: "G-TRE91BENPP"
  };

const app =  initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
