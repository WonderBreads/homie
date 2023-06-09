// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHXTSxRBWYYcaaJU8fVz1kUhhUbtV6J2k",
  authDomain: "homie-f1c4c.firebaseapp.com",
  projectId: "homie-f1c4c",
  storageBucket: "homie-f1c4c.appspot.com",
  messagingSenderId: "296299800138",
  appId: "1:296299800138:web:ba56234b0932254f81a8b3",
  measurementId: "G-CKPG5ZHFTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseAuth = getAuth(app);

export default firebaseAuth;