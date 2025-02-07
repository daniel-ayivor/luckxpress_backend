// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFlN_8z8Tjq8_oyitlKjxXDy0QbFE9d7o",
  authDomain: "courier-tracking-system-5ae73.firebaseapp.com",
  projectId: "courier-tracking-system-5ae73",
  storageBucket: "courier-tracking-system-5ae73.firebasestorage.app",
  messagingSenderId: "401253623454",
  appId: "1:401253623454:web:8031bc605e1ccaa2833d8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Firebase Auth and Firestore

export const db = getFirestore(app);  // This is the Firestore instance

