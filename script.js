document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    const value = parseInt(star.getAttribute('data-star'));
    document.querySelectorAll('.star').forEach(s => {
      s.classList.remove('selected');
    });
    for (let i = 1; i <= value; i++) {
      document.querySelector(`.star[data-star="${i}"]`).classList.add('selected');
    }
  });
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const coords = `${position.coords.latitude},${position.coords.longitude}`;
      document.getElementById('locationInput').value = coords;
    });
  } else {
    alert("Twoja przeglądarka nie obsługuje geolokalizacji");
  }
}

function showForm() {
  document.getElementById('formSection').style.display = 'block';
  document.getElementById('points').style.display = 'none';
}

function showSection(type) {
  document.getElementById('formSection').style.display = 'none';
  const container = document.getElementById('points');
  container.style.display = 'block';
  container.innerHTML = '';

  // przykładowe dane
  const data = [
    {
      name: 'Orlen - Poznań',
      address: 'ul. Przykładowa 10',
      hours: '06:00 - 22:00',
      staff: 'Miła',
      rating: 4,
      location: '52.4064,16.9252'
    },
    {
      name: 'Biedronka - Warszawa',
      address: 'ul. Długa 5',
      hours: '07:00 - 21:00',
      staff: 'Średnia',
      rating: 3,
      location: '52.2297,21.0122'
    }
  ];

  data.forEach(p => {
    const box = document.createElement('div');
    box.classList.add('info-box');
    box.innerHTML = `
      <strong>${p.name}</strong><br/>
      Adres: ${p.address}<br/>
      Godziny: ${p.hours}<br/>
      Obsługa: ${p.staff}<br/>
      Ocena: ${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}<br/>
      <a href="https://www.google.com/maps?q=${p.location}" target="_blank" style="color: #00aaff;">Kliknij aby zobaczyć punkt w Google Maps</a>
    `;
    container.appendChild(box);
  });
}
