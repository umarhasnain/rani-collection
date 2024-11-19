
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged,signOut} from "firebase/auth";
import {getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDO-478xaltJCjezpfRB-OU2g_4kXcRjRU",
  authDomain: "blog-app0.firebaseapp.com",
  projectId: "blog-app0",
  storageBucket: "blog-app0.appspot.com",
  messagingSenderId: "509053694593",
  appId: "1:509053694593:web:06f42a5eea14ed6ebd1380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged,signOut,db ,collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot,storage }