
const listDiv = document.getElementById("letters-list");
const badge = document.getElementById("badge");
const searchInput = document.getElementById("search");

// โหลดจดหมาย
let letters = JSON.parse(localStorage.getItem("letters") || "[]");
let unreadCount = letters.filter(l => !l.read).length;

// อัปเดต badge
badge.innerText = unreadCount;

// Toggle Dark/Pink Mode
const toggleBtn = document.getElementById("toggle-mode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("pink-mode");
});

// Popup Delete
let deleteIndex = null;
const deletePopup = document.getElementById("delete-popup");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");

// Render Letters
function renderLetters(filtered = letters) {
  listDiv.innerHTML = "";
  if (filtered.length === 0) {
    listDiv.innerHTML = "<p>ยังไม่มีจดหมาย 💌</p>";
    return;
  }
  filtered.forEach((letter, index) => {
    const card = document.createElement("div");
    card.className = "letter-card";
    card.innerHTML = `
      <h3>${letter.title} ${letter.read ? "✔" : ""}</h3>
      <p><b>จาก:</b> ${letter.sender}</p>
      <p>${letter.message.substring(0, 50)}...</p>
      <small>${letter.date}</small><br>
      <button onclick="readLetter(${index})">อ่าน</button>
      <button onclick="showDeletePopup(${index})">ลบ</button>
    `;
    listDiv.appendChild(card);
  });
}

// ลบจดหมาย
function showDeletePopup(i) {
  deleteIndex = i;
  deletePopup.style.display = "flex";
}
confirmDelete.addEventListener("click", () => {
  if (deleteIndex !== null) {
    letters.splice(deleteIndex, 1);
    localStorage.setItem("letters", JSON.stringify(letters));
    unreadCount = letters.filter(l => !l.read).length;
    badge.innerText = unreadCount;
    renderLetters();
    deleteIndex = null;
    deletePopup.style.display = "none";
  }
});
cancelDelete.addEventListener("click", () => {
  deleteIndex = null;
  deletePopup.style.display = "none";
});

// Search letters
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = letters.filter(
    l =>
      l.title.toLowerCase().includes(query) ||
      l.sender.toLowerCase().includes(query)
  );
  renderLetters(filtered);
});

// ---------------- Popup อ่าน ----------------
const readPopup = document.getElementById("read-popup");
const readTitle = document.getElementById("read-title");
const readSender = document.getElementById("read-sender");
const readMessage = document.getElementById("read-message");
const closeRead = document.getElementById("close-read");

function readLetter(i) {
  const l = letters[i];

  // แสดง popup
  readTitle.innerText = l.title;
  readSender.innerText = `จาก: ${l.sender}`;
  readMessage.innerText = l.message;

  readPopup.style.display = "flex";

  // ติ๊กอ่านแล้ว
  if (!l.read) {
    l.read = true;
    localStorage.setItem("letters", JSON.stringify(letters));
    unreadCount--;
    badge.innerText = unreadCount;
    renderLetters();
  }
}

// ปิด popup
closeRead.addEventListener("click", () => {
  readPopup.style.display = "none";
});

// เรียกตอนโหลด
renderLetters();
