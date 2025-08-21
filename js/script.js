const apiKey = "9a3080b6"; // API Key de OMD

function searchMovies() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('movieList');
      container.innerHTML = "";

      if (data.Response === "True") {
        data.Search.forEach(movie => {
          const card = document.createElement('div');
          card.className = "movie-card";
          card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/100x150'}" alt="Poster">
            <div>
              <h3>${movie.Title}</h3>
              <p><strong>Año:</strong> ${movie.Year}</p>
              <button onclick="getMovieDetails('${movie.imdbID}')">Ver más</button>
            </div>
          `;
          container.appendChild(card);
        });
      } else {
        container.innerHTML = "<p>No se encontraron resultados.</p>";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('movieList').innerHTML = "<p>Ocurrió un error.</p>";
    });
}

function getMovieDetails(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        document.getElementById('modalPoster').src = data.Poster !== "N/A" ? data.Poster : '';
        document.getElementById('modalTitle').textContent = data.Title;
        document.getElementById('modalYear').textContent = data.Year;
        document.getElementById('modalGenre').textContent = data.Genre;
        document.getElementById('modalPlot').textContent = data.Plot;

        document.getElementById('movieModal').classList.remove('hidden');
      }
    });
}

function closeModal() {
  document.getElementById('movieModal').classList.add('hidden');
}

// Modo oscuro / claro
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeToggle");

  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  if (body.classList.contains("dark-mode")) {
    btn.textContent = "☀️ Modo Claro";
  } else {
    btn.textContent = "🌙 Modo Oscuro";
  }
}

