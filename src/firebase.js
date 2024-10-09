import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBHbEQ5L6uNwT738sNKXlQAurK2r5SOvFc",
  authDomain: "hisaab-app-46507.firebaseapp.com",
  projectId: "hisaab-app-46507",
  storageBucket: "hisaab-app-46507.appspot.com",
  messagingSenderId: "109542981466",
  appId: "1:109542981466:web:7d5fe11ae51868fa9cbd63",
  measurementId: "G-7DD6WDC92Y",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
