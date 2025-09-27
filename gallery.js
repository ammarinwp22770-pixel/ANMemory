import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// ----------------- Config -----------------
const firebaseConfig = {
  apiKey: "AIzaSyBZ6LqVNG-8EFFmyXBxBctJ9OGkayfNA4A",
  authDomain: "anmemorise.firebaseapp.com",
  projectId: "anmemorise",
  storageBucket: "anmemorise.firebasestorage.app",
  messagingSenderId: "991699333084",
  appId: "1:991699333084:web:17595fd2079119fd9b2919",
  measurementId: "G-SLJW3Q03HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ----------------- Upload Function -----------------
const uploadInput = document.getElementById('upload-input');
const uploadBtn = document.getElementById('upload-btn');
const gallery = document.getElementById('gallery');

uploadBtn.addEventListener('click', async () => {
  const file = uploadInput.files[0];
  if (!file) return alert("เลือกไฟล์ก่อนนะ 💖");

  // อัพโหลดไป Firebase Storage
  const storageRef = ref(storage, 'gallery/' + file.name);
  await uploadBytes(storageRef, file);

  // เอา URL มาเก็บ Firestore
  const url = await getDownloadURL(storageRef);
  await addDoc(collection(db, "gallery"), { url: url, name: file.name, time: new Date() });

  alert("อัพโหลดเรียบร้อย 💕");
  loadGallery();
});

// ----------------- Load Gallery -----------------
async function loadGallery() {
  gallery.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "gallery"));
  querySnapshot.forEach(doc => {
    const img = document.createElement('img');
    img.src = doc.data().url;
    img.alt = doc.data().name;
    img.style.width = "150px";
    img.style.margin = "10px";
    gallery.appendChild(img);
  });
}

// โหลดตอนเริ่ม
loadGallery();
