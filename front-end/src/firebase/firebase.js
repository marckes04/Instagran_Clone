
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import{getFireStore, getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "",
  authDomain: "insta-clone-yt-8f933.firebaseapp.com",
  projectId: "insta-clone-yt-8f933",
  storageBucket: "insta-clone-yt-8f933.firebasestorage.app",
  messagingSenderId: "539514993948",
  appId: "1:539514993948:web:9ed0444c6b0cca9e00ced9",
  measurementId: "G-C3YQYKH7JD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFireStore(app);
const storage = getStorage(app);

export{app,auth,firestore,storage};
