import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAWq7YqYtih602HrEnWLQLFEBrlgTI-pZg",
  authDomain: "emcargo-fc598.firebaseapp.com",
  databaseURL: "https://emcargo-fc598-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "emcargo-fc598",
  storageBucket: "emcargo-fc598.appspot.com",
  messagingSenderId: "80389180467",
  appId: "1:80389180467:web:d5791e3bd8ade2d8466746",
  measurementId: "G-B9JGBQ0TB7"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }