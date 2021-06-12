import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6VQMc9t-vEdo5P2MejSs1f84h4khCCRQ",
  authDomain: "react-backend-exercise.firebaseapp.com",
  projectId: "react-backend-exercise",
  storageBucket: "react-backend-exercise.appspot.com",
  messagingSenderId: "485574218400",
  appId: "1:485574218400:web:a0a639f70fda3dc6b72fc5",
  measurementId: "G-5SNE8S9LBS",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth;
const storage = firebase.storage;
const db = firebase.firestore;
const func = firebase.functions;

export { auth, storage, db, func, firebase as default };