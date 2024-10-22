// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVWMFyXymwZQmHyuW4c29ZJil-CZU9Akc",
  authDomain: "socila-network.firebaseapp.com",
  projectId: "socila-network",
  storageBucket: "socila-network.appspot.com",
  messagingSenderId: "435501455195",
  appId: "1:435501455195:web:0cb91cdb26450db3e26c7e",
  measurementId: "G-LE7EB0S0TX"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };