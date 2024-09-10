import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZ_H74xEFeeEfd9DLbAf1x5gebGxRkHSo",
  authDomain: "devfolio-5df3c.firebaseapp.com",
  databaseURL: "https://devfolio-5df3c-default-rtdb.firebaseio.com",
  projectId: "devfolio-5df3c",
  storageBucket: "devfolio-5df3c.appspot.com",
  messagingSenderId: "933208288501",
  appId: "1:933208288501:web:d7475be7248a148a12a9bc",
  measurementId: "G-81TVV645T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
export { db, auth };
