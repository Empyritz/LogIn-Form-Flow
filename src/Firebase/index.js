// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwFs9qeJDhiM30N3a8T3lzQrNneGzr_Yw",
  authDomain: "formtest-c0a76.firebaseapp.com",
  databaseURL: "https://formtest-c0a76-default-rtdb.firebaseio.com",
  projectId: "formtest-c0a76",
  storageBucket: "formtest-c0a76.appspot.com",
  messagingSenderId: "727135037458",
  appId: "1:727135037458:web:210cd1b9617395daa350cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)