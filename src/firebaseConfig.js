// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwv7vypO1mmSDRcOJjvCIG76N4rA3GrQU",
    authDomain: "launcher-app-empresariales.firebaseapp.com",
    projectId: "launcher-app-empresariales",
    storageBucket: "launcher-app-empresariales.firebasestorage.app",
    messagingSenderId: "940292918167",
    appId: "1:940292918167:web:88cc28d7edcefbceffd2d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);