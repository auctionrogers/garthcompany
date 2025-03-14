// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCN-hqm2-S6LD6UxdtSVdkY0p9ZL5bNM94",
    authDomain: "garth-company.firebaseapp.com",
    projectId: "garth-company",
    storageBucket: "garth-company.appspot.com",
    messagingSenderId: "881756283121",
    appId: "1:881756283121:web:e1d08a1e59ce5724070950",
    measurementId: "G-67ZZ85XE3Q"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();
