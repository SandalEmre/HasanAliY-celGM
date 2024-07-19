// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBk75CXNuGmOUvPPGZ8SmKaofYl5FyBECw",
    authDomain: "hay-admin-153f1.firebaseapp.com",
    projectId: "hay-admin-153f1",
    storageBucket: "hay-admin-153f1.appspot.com",
    messagingSenderId: "736129001823",
    appId: "1:736129001823:web:3e9701ba4d77a8025faeea"
};

const app = initializeApp(firebaseConfig);
// Firestore'u başlatın
const db = getFirestore(app);

export { db };