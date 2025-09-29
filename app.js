import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyBZ6LqVNG-8EFFmyXBxBctJ9OGkayfNA4A",
  authDomain: "anmemorise.firebaseapp.com",
  projectId: "anmemorise",
  storageBucket: "anmemorise.appspot.com",
  messagingSenderId: "991699333084",
  appId: "1:991699333084:web:17595fd2079119fd9b2919",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ===== DOM =====
const loginPage = document.getElementById('login-page');
const albumPage = document.getElementById('album-page');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const msg = document.getElementById('msg');
const albumGrid = document.getElementById('album-grid');

// ===== Login/Register =====
registerBtn.addEventListener('click', async ()=>{
    const email = emailInput.value;
    const pass = passwordInput.value;
    try{
        await createUserWithEmailAndPassword(auth,email,pass);
        msg.style.color="green";
        msg.textContent="ลงทะเบียนสำเร็จ ล็อกอินได้เลย";
    }catch(e){ msg.textContent=e.message; }
});

loginBtn.addEventListener('click', async ()=>{
    const email = emailInput.value;
    const pass = passwordInput.value;
    try{
        await signInWithEmailAndPassword(auth,email,pass);
    }catch(e){ msg.textContent=e.message; }
});

logoutBtn.addEventListener('click', async ()=>{
    await signOut(auth);
});

// ===== Auth State =====
onAuthStateChanged(auth, async user=>{
    if(user){
        loginPage.classList.add("hidden");
        albumPage.classList.remove("hidden");
        loadAlbums();
    }else{
        loginPage.classList.remove("hidden");
        albumPage.classList.add("hidden");
    }
});

// ===== Load Albums from Firestore =====
async function loadAlbums(){
    albumGrid.innerHTML="";
    const querySnapshot = await getDocs(collection(db,"albums"));
    querySnapshot.forEach(docSnap=>{
        const data = docSnap.data();
        const card = document.createElement("div");
        card.className="album-card";
        card.dataset.id = docSnap.id;
        card.innerHTML = `
            <img src="${data.cover}">
            <div class="album-content">
                <div class="album-title">${data.name}</div>
                <div class="album-desc">${data.desc}</div>
                <button class="view-all-btn">ดูทั้งหมด</button>
                <button class="add-photo-btn">เพิ่มรูป</button>
            </div>`;
        albumGrid.appendChild(card);
    });
}
