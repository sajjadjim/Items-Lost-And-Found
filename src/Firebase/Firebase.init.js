// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyDFBXWdDv-X0YkHTpEOUUiN8R6yKEJsTqM",
  authDomain: "lost-and-found-website-c7da7.firebaseapp.com",
  projectId: "lost-and-found-website-c7da7",
  storageBucket: "lost-and-found-website-c7da7.firebasestorage.app",
  messagingSenderId: "566673937997",
  appId: "1:566673937997:web:d3e61493fcd680669fee04",
  measurementId: "G-H0JT0SSXCR"
};

// export default firebaseConfig;

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;