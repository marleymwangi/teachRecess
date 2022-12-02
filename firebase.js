// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2zejokwXiGxhB5gX1_Y9eqMdwcd-71Do",
  authDomain: "recess-prod-254.firebaseapp.com",
  projectId: "recess-prod-254",
  storageBucket: "recess-prod-254.appspot.com",
  messagingSenderId: "947701118445",
  appId: "1:947701118445:web:ff3472964a6e50603a63e4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
