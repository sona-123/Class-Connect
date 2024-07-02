import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyActQutHu7hipWB_ktCqBHll0HHFHHbslY",
  authDomain: "file-sharing-116d9.firebaseapp.com",
  projectId: "file-sharing-116d9",
  storageBucket: "file-sharing-116d9.appspot.com",
  messagingSenderId: "907215869962",
  appId: "1:907215869962:web:baa9a4ff22d69092f6e7f3",
  measurementId: "G-3X6DWSKHXQ"
};
console.log(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);