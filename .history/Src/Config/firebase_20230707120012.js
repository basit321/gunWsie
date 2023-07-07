import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCx9R7eE4L8-xjSDcTk6jA-XayqmlcWQ_I",
    authDomain: "gunwise-dd715.firebaseapp.com",
    projectId: "gunwise-dd715",
    storageBucket: "gunwise-dd715.appspot.com",
    messagingSenderId: "523865209818",
    appId: "1:523865209818:web:aef7b88868df6e249e5ee3",
    measurementId: "G-LYVSK3NTR2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);