import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBhn7oVYceBRrHdmfckTWWulgGtVNAu0A",
    authDomain: "connect-me-360.firebaseapp.com",
    databaseURL: "https://connect-me-360-default-rtdb.firebaseio.com",
    projectId: "connect-me-360",
    storageBucket: "connect-me-360.appspot.com",
    messagingSenderId: "183998015918",
    appId: "1:183998015918:web:c20421dbf01e41cd4a803f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase(app);
export const storage = getStorage(app);
export const db = getFirestore(app);