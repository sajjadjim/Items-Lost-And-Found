// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFBXWdDv-X0YkHTpEOUUiN8R6yKEJsTqM",
  authDomain: "lost-and-found-website-c7da7.firebaseapp.com",
  projectId: "lost-and-found-website-c7da7",
  storageBucket: "lost-and-found-website-c7da7.firebasestorage.app",
  messagingSenderId: "566673937997",
  appId: "1:566673937997:web:d3e61493fcd680669fee04",
  measurementId: "G-H0JT0SSXCR"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;