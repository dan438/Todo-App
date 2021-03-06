import firebase from "firebase";

const FirebaseApp = firebase.initializeApp({
  apiKey: "process.env.REACT_APP_API_KEY",
  authDomain: "process.env.REACT_APP_AUTH_DOMAIN",
  projectId: "process.env.REACT_APP_PROJECT_ID",
  storageBucket: "process.env.REACT_APP_STORAGE_BUCKET",
  messagingSenderId: "process.env.REACT_APP_MESSAGING_SENDER_ID",
  appId: "process.env.REACT_APP_APP_ID",
});

const db = FirebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
