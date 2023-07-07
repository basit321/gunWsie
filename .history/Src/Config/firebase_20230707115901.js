// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCx9R7eE4L8-xjSDcTk6jA-XayqmlcWQ_I",
    authDomain: "gunwise-dd715.firebaseapp.com",
    projectId: "gunwise-dd715",
    storageBucket: "gunwise-dd715.appspot.com",
    messagingSenderId: "523865209818",
    appId: "1:523865209818:web:aef7b88868df6e249e5ee3",
    measurementId: "G-LYVSK3NTR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);