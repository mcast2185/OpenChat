import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBF58oowvzxDsHLcOWDecPd4QfQbOw2oF4",
  authDomain: "openchat-bee30.firebaseapp.com",
  projectId: "openchat-bee30",
  storageBucket: "openchat-bee30.appspot.com",
  messagingSenderId: "1032219447442",
  appId: "1:1032219447442:web:8faad1cd1200e38e26964b",
  measurementId: "G-QTBVGV3KBK"
}).auth();