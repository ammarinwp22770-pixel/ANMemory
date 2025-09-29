// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// ใส่ config ของ Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZ6LqVNG-8EFFmyXBxBctJ9OGkayfNA4A",
  authDomain: "anmemorise.firebaseapp.com",
  projectId: "anmemorise",
  storageBucket: "anmemorise.firebasestorage.app",
  messagingSenderId: "991699333084",
  appId: "1:991699333084:web:17595fd2079119fd9b2919",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
