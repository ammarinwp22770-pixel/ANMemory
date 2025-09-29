// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBZ6LqVNG-8EFFmyXBxBctJ9OGkayfNA4A",
  authDomain: "anmemorise.firebaseapp.com",
  projectId: "anmemorise",
  storageBucket: "anmemorise.appspot.com",
  messagingSenderId: "991699333084",
  appId: "1:991699333084:web:17595fd2079119fd9b2919",

};

export const app = initializeApp(firebaseConfig);
