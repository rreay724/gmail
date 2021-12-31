import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "336617.firebaseapp.com",
  projectId: "gmail-336617",
  storageBucket: "gmail-336617.appspot.com",
  messagingSenderId: "325866235932",
  appId: "1:325866235932:web:7602c42a9bda187dadd7d9",
  measurementId: "G-71SJGPYR7S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
