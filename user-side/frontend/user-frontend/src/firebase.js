// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "medicare-55710.firebaseapp.com",
  projectId: "medicare-55710",
  storageBucket: "medicare-55710.appspot.com",
  messagingSenderId: "470777842935",
  appId: "1:470777842935:web:08d179df925f47f25b17f2",
  measurementId: "G-BE8P63JTC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);