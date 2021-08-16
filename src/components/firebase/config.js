import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdJKGd-0qVJJ5nHYild2f4rCulRdSW9bI",
  authDomain: "jitter-fbfd3.firebaseapp.com",
  projectId: "jitter-fbfd3",
  storageBucket: "jitter-fbfd3.appspot.com",
  messagingSenderId: "1064487694702",
  appId: "1:1064487694702:web:5a12576fa67a1eb982517f",
};

const app = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = {
  auth: firebase.auth(app),
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
