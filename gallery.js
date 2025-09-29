import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { 
  getStorage, ref, uploadBytes, getDownloadURL, deleteObject 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// ----------------- Config -----------------
const firebaseConfig = {
  apiKey: "AIzaSyBZ6LqVNG-8EFFmyXBxBctJ9OGkayfNA4A",
  authDomain: "anmemorise.firebaseapp.com",
  projectId: "anmemorise",
  storageBucket: "anmemorise.appspot.com",
  messagingSenderId: "991699333084",
  appId: "1:991699333084:web:17595fd2079119fd9b2919",
  measurementId: "G-SLJW3Q03HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ----------------- Elements -----------------
const uploadInput = document.getElementById('upload-input');
const uploadBtn = document.getElementById('upload-btn');
const albumInput = document.getElementById('album-input');
const gallery = document.getElementById('gallery');
const albumSelect = document.getElementById('album-select');

// ----------------- Upload Function -----------------
uploadBtn.addEventListener('click', async () => {
  const file = uploadInput.files[0];
  const albumName = albumInput.value.trim() || "ทั่วไป";

  if (!file) return alert("เลือกไฟล์ก่อนนะ 💖");

  try {
    // ใช้ timestamp กันซ้ำ
    const storageRef = ref(storage, `gallery/${albumName}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "gallery"), { 
      url: url, 
      name: file.name, 
      album: albumName,
      time: new Date()
    });

    alert("อัพโหลดเรียบร้อย 💕");
    uploadInput.value = "";
    albumInput.value = "";
    loadGallery(albumName);
    loadAlbumsList();
  } catch(err) {
    console.error(err);
    alert("อัพโหลดไม่สำเร็จ ❌ ลองอีกครั้ง");
  }
});

// ----------------- Load Gallery -----------------
async function loadGallery(albumName = "ทั้งหมด") {
  gallery.innerHTML = "";
  let q = collection(db, "gallery");

  if (albumName !== "ทั้งหมด") {
    q = query(collection(db, "gallery"), where("album", "==", albumName));
  }

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();

    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.margin = "10px";

    const img = document.createElement('img');
    img.src = data.url;
    img.alt = data.name;
    img.style.width = "150px";
    img.style.borderRadius = "10px";

    // ปุ่มลบ
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.style.position = "absolute";
    delBtn.style.top = "5px";
    delBtn.style.right = "5px";
    delBtn.style.background = "red";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.borderRadius = "50%";
    delBtn.style.cursor = "pointer";

    delBtn.addEventListener("click", async () => {
      if (!confirm("ลบรูปนี้จริงๆใช่มั้ย 💔")) return;

      // ลบจาก Storage
      const storageRefDel = ref(storage, `gallery/${data.album}/${data.name}`);
      await deleteObject(storageRefDel);

      // ลบจาก Firestore
      await deleteDoc(doc(db, "gallery", docSnap.id));

      alert("ลบแล้ว 🗑️");
      loadGallery(albumName);
    });

    container.appendChild(img);
    container.appendChild(delBtn);
    gallery.appendChild(container);
  });
}

// ----------------- Load Album List -----------------
async function loadAlbumsList() {
  const querySnapshot = await getDocs(collection(db, "gallery"));
  const albums = new Set(["ทั้งหมด"]);
  querySnapshot.forEach(docSnap => {
    albums.add(docSnap.data().album || "ทั่วไป");
  });

  albumSelect.innerHTML = "";
  albums.forEach(al => {
    const opt = document.createElement("option");
    opt.value = al;
    opt.textContent = al;
    albumSelect.appendChild(opt);
  });
}

// ----------------- Event Album Select -----------------
albumSelect.addEventListener("change", (e) => {
  loadGallery(e.target.value);
});

// ----------------- Init -----------------
loadGallery();
loadAlbumsList();
