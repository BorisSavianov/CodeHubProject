import { config } from "dotenv";
config();

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

import {
  getMessaging,
  getToken,
  onMessage as messagingOnMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
let messaging = null;

if (typeof window !== "undefined") {
  // Check if running in a browser environment
  messaging = getMessaging(app);
}

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
  messagingOnMessage as onMessage,
  messaging,
};
