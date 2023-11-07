import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAfqUiHocer4GsfI8z-c-vCjpUfSANnVSY",
    authDomain: "skola-30019.firebaseapp.com",
    databaseURL: "https://skola-30019-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "skola-30019",
    storageBucket: "skola-30019.appspot.com",
    messagingSenderId: "838616100299",
    appId: "1:838616100299:web:df4c17e42219dc80a99a4e",
    measurementId: "G-KF4CVWBKE4"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = firebase.firestore();
export const analytics = getAnalytics(app);