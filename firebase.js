// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6ZIN6dTJXwRReFkgjkBxfra2KWRASxa8",
  authDomain: "recess-kenya.firebaseapp.com",
  projectId: "recess-kenya",
  storageBucket: "recess-kenya.appspot.com",
  messagingSenderId: "827199581866",
  appId: "1:827199581866:web:50a7cc45fcfcff583a6ad3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
//const storage = getStorage(app);

export {
  app,
  db, //storage
};
