// Import the functions you need from the SDKs you need
import { Timestamp, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmGUkw5-DgIZzdN-CsDRkOvpU9bE-H8rE",
  authDomain: "saynaira-271d8.firebaseapp.com",
  projectId: "saynaira-271d8",
  storageBucket: "saynaira-271d8.firebasestorage.app",
  messagingSenderId: "933116450197",
  appId: "1:933116450197:web:24b69e515621eea946d29c",
  measurementId: "G-ELFVQH261Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const blogPost = {
  title: "Blog title",
  content: "Full blog content here...",
  authorId: "userUID",
  authorEmail: "user@example.com",
  createdAt: Timestamp.now(),
};

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
