// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const { initializeFirestore } = require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTolZAU0u-QfFX2b4AyEt5RLS3EnltuTI",
  authDomain: "safesphere-1a073.firebaseapp.com",
  projectId: "safesphere-1a073",
  storageBucket: "safesphere-1a073.appspot.com",
  messagingSenderId: "27611406722",
  appId: "1:27611406722:web:aa727a73a233ed61f42f9b",
  measurementId: "G-FQ78CLHGXH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
