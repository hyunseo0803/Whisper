// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB-uWN6o2ZLTiy6RiOJcQQF0HtS7YvFpb8",
  authDomain: "whisper-5d18b.firebaseapp.com",
  projectId: "whisper-5d18b",
  storageBucket: "whisper-5d18b.appspot.com",
  messagingSenderId: "33932466396",
  appId: "1:33932466396:web:2756893aacc6cb768c3c19",
  measurementId: "G-85SFJMKGEB"
};


// Initialize Firebase
// let app;
// if (firebase.apps.length === 0){
//     app = firebase.initializeApp(firebaseConfig);
// }else{
//     app = firebase.app();
// }
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const SIGNIN_email_password = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('로그인 성공!!')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}