// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBErIdbVSly-bRWVd9cjCXbTHPjvk7TR-E",
  authDomain: "openjio-92483.firebaseapp.com",
  projectId: "openjio-92483",
  storageBucket: "openjio-92483.firebasestorage.app",
  messagingSenderId: "241777910828",
  appId: "1:241777910828:web:c5544fcfff60c45f61dd89",
  measurementId: "G-GMJRH946W5",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(app);
