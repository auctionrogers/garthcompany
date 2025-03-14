// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN-hqm2-S6LD6UxdtSVdkY0p9ZL5bNM94",
  authDomain: "garth-company.firebaseapp.com",
  projectId: "garth-company",
  storageBucket: "garth-company.appspot.com",
  messagingSenderId: "881756283121",
  appId: "1:881756283121:web:e1d08a1e59ce5724070950"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add a test document directly from this file to verify Firebase connection
db.collection("test").add({
  message: "Connection test",
  timestamp: new Date()
})
.then((docRef) => {
  console.log("Test document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding test document: ", error);
});
