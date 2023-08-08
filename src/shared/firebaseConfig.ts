// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsIGLTmhf-C4RyHDD5cLbuXemC3qfguRI",
    authDomain: "proyecto-final-utn-9c7f5.firebaseapp.com",
    projectId: "proyecto-final-utn-9c7f5",
    storageBucket: "proyecto-final-utn-9c7f5.appspot.com",
    messagingSenderId: "802522173670",
    appId: "1:802522173670:web:acd97d059e9d889524ab27",
    measurementId: "G-NFRF72871H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }