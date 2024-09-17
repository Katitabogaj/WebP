document.getElementById("keres").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (!username) {
    alert("Kérlek, írj be egy felhasználónevet!");
    return;
  }
  keresFelh(username);
});

document.getElementById("osszesitett").addEventListener("click", () => {
  document.getElementById("osszesitettEredmeny").classList.remove("hidden");
  document.getElementById("nyelvekEredmeny").classList.add("hidden");
});

document.getElementById("nyelvek").addEventListener("click", () => {
  document.getElementById("osszesitettEredmeny").classList.add("hidden");
  document.getElementById("nyelvekEredmeny").classList.remove("hidden");
});

function keresFelh(username) {
  const url = `https://www.codewars.com/api/v1/users/${username}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          megjelenitHiba("Nincs ilyen felhasználó.");
        }
        throw new Error(`Hiba: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      megjelenitAdatokat(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function megjelenitHiba(uzenet) {
  document.getElementById("osszesitettEredmeny").classList.add("hidden");
  document.getElementById("nyelvekEredmeny").classList.add("hidden");
  document.getElementById("hibaUzenet").classList.remove("hidden");
  document.getElementById("hibaUzenet").innerText = uzenet;
}

function megjelenitAdatokat(data) {
  document.getElementById("hibaUzenet").classList.add("hidden");

  const osszesitettDiv = document.getElementById("osszesitettEredmeny");
  osszesitettDiv.innerHTML = `
        <h2>Összesített pontok</h2>
        <p>Felhasználónév: ${data.username}</p>
        <p>Összes pont: ${data.honor}</p>
        <p>Rang: ${data.ranks.overall.name}</p>
    `;
  osszesitettDiv.classList.remove("hidden");

  // Pontok nyelvek szerint
  const nyelvekDiv = document.getElementById("nyelvekEredmeny");
  nyelvekDiv.innerHTML = "<h2>Pontok nyelvek szerint</h2>";
  const languages = data.ranks.languages;
  const list = document.createElement("ul");

  for (const [language, details] of Object.entries(languages)) {
    const listItem = document.createElement("li");
    listItem.innerText = `${language}: ${details.score} pont`;
    list.appendChild(listItem);
  }

  nyelvekDiv.appendChild(list);
  nyelvekDiv.classList.add("hidden");
}
