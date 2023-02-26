import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function uploadImage(image) {
  const storageRef = ref(storage, `/product-images/${Date.now()}-${image.name}`);

  const response = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(response.ref);
  return url;
};

async function uploadImages(images) {
  const imagePromises = Array.from(images, (image) => uploadImage(image));

  const imageRes = await Promise.all(imagePromises);
  return imageRes; // list of url like ["https://..", ...]
};


export { auth, db, storage, uploadImages}