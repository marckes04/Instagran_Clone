// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVbQuvyHn0Xkw116VV-8RQnq3YrrGFLkU",
  authDomain: "insta-clone-yt-8f933.firebaseapp.com",
  databaseURL: "https://insta-clone-yt-8f933-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "insta-clone-yt-8f933",
  storageBucket: "insta-clone-yt-8f933.firebasestorage.app",
  messagingSenderId: "539514993948",
  appId: "1:539514993948:web:9ed0444c6b0cca9e00ced9",
  measurementId: "G-C3YQYKH7JD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };