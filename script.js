const db = firebase.firestore();

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

function loadAllPoints() {
  const container = document.getElementById("pointsList");
  container.innerHTML = '';

  db.collection("punkty").orderBy("timestamp", "desc").limit(10).get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "point-box";
      div.innerHTML = `
        <strong>${data.nazwa}</strong><br/>
        Adres: ${data.adres}<br/>
        Godziny: ${data.godziny}<br/>
        Obsługa: ${data.obsługa}<br/>
        Ocena: ${"★".repeat(data.ocena)}${"☆".repeat(5 - data.ocena)}<br/>
        <a href="https://maps.google.com/?q=${data.lokalizacja}" target="_blank" style="color:#00aaff;">Kliknij aby zobaczyć punkt w Google Maps</a>
      `;
      container.appendChild(div);
    });
  });
}
