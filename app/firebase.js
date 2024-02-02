// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFDbBbHK8fwapPV9ndCSJv-R_AvskVvu4",
  authDomain: "price-tracker-next-14.firebaseapp.com",
  projectId: "price-tracker-next-14",
  storageBucket: "price-tracker-next-14.appspot.com",
  messagingSenderId: "763558854710",
  appId: "1:763558854710:web:e951b654803c4bc8d91897",
  measurementId: "G-YPW91S30N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);