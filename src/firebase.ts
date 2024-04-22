// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQaubjgwWUcy2kqwHalfEHWh6CmNqniRo",
  authDomain: "oracle-6e625.firebaseapp.com",
  projectId: "oracle-6e625",
  storageBucket: "oracle-6e625.appspot.com",
  messagingSenderId: "936745519158",
  appId: "1:936745519158:web:32cbc54c6019a4e2843097",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const storage = getStorage(firebaseApp, "gs://my-custom-bucket");
export const storage = getStorage();
// export const mediationRef = ref(storage, "meditation");
export const auth = getAuth(app);
