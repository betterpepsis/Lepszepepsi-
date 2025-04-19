
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSlED_07CPrKkzv-GaHko8yhLI93M6QUg",
  authDomain: "lepszepepsi-d2fa6.firebaseapp.com",
  projectId: "lepszepepsi-d2fa6",
  storageBucket: "lepszepepsi-d2fa6.appspot.com",
  messagingSenderId: "676886384624",
  appId: "1:676886384624:web:6fd7e5bbc711a3c3be1735"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obsługa formularza
const form = document.getElementById('addPointForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      author: form.author.value,
      name: form.name.value,
      address: form.address.value,
      hours: form.hours.value,
      service: form.service.value,
      opinion: form.opinion.value
    };
    await addDoc(collection(db, "points"), data);
    alert("Punkt dodany!");
    form.reset();
  });
}

// Wyświetlanie punktów
const container = document.getElementById("points-container");
if (container) {
  const querySnapshot = await getDocs(collection(db, "points"));
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    const div = document.createElement("div");
    div.className = "info-box";
    div.innerHTML = `
      <strong>${d.name}</strong><br/>
      Adres: ${d.address}<br/>
      Godziny: ${d.hours}<br/>
      Obsługa: ${d.service}<br/>
      Opinia: ${d.opinion}<br/>
      Autor: ${d.author}
    `;
    container.appendChild(div);
  });
}
