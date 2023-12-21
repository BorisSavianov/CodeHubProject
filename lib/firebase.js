import {
  getAuth,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signIn,
  signInWithPopup as signInPopup,
  GoogleAuthProvider,
  onAuthStateChanged as authStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD7kPOrnB_1bfdND2zB1mDtdwCDYp4jVZY",
  authDomain: "codehub-bac6f.firebaseapp.com",
  projectId: "codehub-bac6f",
  storageBucket: "codehub-bac6f.appspot.com",
  messagingSenderId: "300433827891",
  appId: "1:300433827891:web:7da4ad1d78737b76bb9b46",
  measurementId: "G-WEY9Q93WDZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  createUser,
  signIn,
  signInPopup,
  GoogleAuthProvider,
  authStateChanged,
  signOut,
  doc,
  setDoc,
  getDoc,
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getMessaging,
  app,
  getToken,
};
