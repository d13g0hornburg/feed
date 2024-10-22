// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeyY0HA9KKVwXBpZTZBxrODlPw7hZ-hjw",
  authDomain: "feed-69e52.firebaseapp.com",
  databaseURL: "https://feed-69e52-default-rtdb.firebaseio.com",
  projectId: "feed-69e52",
  storageBucket: "feed-69e52.appspot.com",
  messagingSenderId: "995656564640",
  appId: "1:995656564640:web:d43462a4763cb0034d2ec5",
  measurementId: "G-YQE2NR5104"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
 