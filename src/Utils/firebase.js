// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import {getAuth} from 'firebase/auth'  //we need to import this to use auth service
import "firebase/compat/firestore"
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


//here we need to export to other componet

export const auth =getAuth(app);  // 