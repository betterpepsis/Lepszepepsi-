
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSlED_07CPrKkzv-GaHko8yhLI93M6QUg",
  authDomain: "lepszepepsi-d2fa6.firebaseapp.com",
  projectId: "lepszepepsi-d2fa6",
  storageBucket: "lepszepepsi-d2fa6.firebasestorage.app",
  messagingSenderId: "676886384624",
  appId: "1:676886384624:web:6fd7e5bbc711a3c3be1735"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const placeForm = document.getElementById("placeForm");
const placesList = document.getElementById("placesList");

let map;
let currentLocation = { lat: 52.2297, lng: 21.0122 };

navigator.geolocation.getCurrentPosition(pos => {
  currentLocation = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  };
  loadMap();
}, loadMap);

function loadMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: currentLocation,
    zoom: 12
  });

  new google.maps.Marker({
    position: currentLocation,
    map,
    title: "Twoja lokalizacja"
  });

  loadPlaces();
}

placeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;
  const rating = document.getElementById("rating").value;
  const pallet = document.getElementById("pallet").value;
  const file = document.getElementById("photo").files[0];

  let photoURL = "";

  if (file) {
    const storageRef = ref(storage, "photos/" + file.name);
    await uploadBytes(storageRef, file);
    photoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "places"), {
    name,
    desc,
    rating: Number(rating),
    pallet,
    photoURL,
    lat: currentLocation.lat,
    lng: currentLocation.lng,
    created: new Date()
  });

  alert("Dodano miejsce!");
  placeForm.reset();
  loadMap();
});

async function loadPlaces() {
  const querySnapshot = await getDocs(collection(db, "places"));
  placesList.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map,
      title: data.name
    });

    const content = `
      <h3>${data.name}</h3>
      <p><strong>Opis:</strong> ${data.desc}</p>
      <p><strong>Ocena:</strong> ${data.rating}</p>
      <p><strong>Wjazd paletą:</strong> ${data.pallet}</p>
      ${data.photoURL ? `<img src="${data.photoURL}" width="200" />` : ""}
      <p><a target="_blank" href="https://www.google.com/maps?q=${data.lat},${data.lng}">Pokaż w Google Maps</a></p>
    `;

    const infoWindow = new google.maps.InfoWindow({ content });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    const div = document.createElement("div");
    div.innerHTML = content;
    placesList.appendChild(div);
  });
}

window.showSection = function(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};
