// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN-hqm2-S6LD6UxdtSVdkY0p9ZL5bNM94",
  authDomain: "garth-company.firebaseapp.com",
  projectId: "garth-company",
  storageBucket: "garth-company.firebasestorage.app",
  messagingSenderId: "881756283121",
  appId: "1:881756283121:web:e1d08a1e59ce5724070950",
  measurementId: "G-67ZZ85XE3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);