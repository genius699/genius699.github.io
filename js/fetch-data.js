function csvToJson(csv) {
    if (!csv) {
        console.error('CSV vacío o no válido');
        return [];
    }

    const lines = csv.trim().split("\n");
    if (lines.length === 0) {
        console.error('El CSV no tiene datos válidos');
        return [];
    }

    const splitCsvLine = (line) => {
        const regex = /,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
        return line.split(regex).map(cell => cell.replace(/(^"|"$)/g, '').trim());
    };

    const headers = splitCsvLine(lines[0]);
    const rows = lines.slice(1).map(line => splitCsvLine(line));

    return rows.map(row =>
        Object.fromEntries(row.map((cell, i) => [headers[i], cell]))
    );
}


async function fetchGoogleSheetData() {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQb1SUV4D-2I5OLjaUbbzuMRPqyJiyfQHI8p9N5_f3c2vPzGUPe-AHbLPbERpYMQUizi0vmMTdL9Z3J/pub?output=csv';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error de red: ' + response.statusText);

        const data = await response.text();
        if (!data || data.trim() === "") {
            throw new Error('El CSV está vacío o no se pudo leer correctamente.');
        }

        const jsonData = csvToJson(data);
        renderMovies(jsonData);

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}


function renderMovies(movies) {
    const container = document.getElementById('songs-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar las películas

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('song', 'fade-up');

        // Agregar el evento de clic a toda la tarjeta
        movieDiv.setAttribute('onclick', `openMovieModal('${movie.link_movie}')`);

        movieDiv.innerHTML = `
        <div class="song-img">
          <img src="${movie.link_img}" alt="${movie.title_movie}">
        </div>
        <div class="song-details">
          <div class="song-details-content">
            <div class="song-name">${movie.title_movie}</div>
            <div class="artist-name">${movie.studio} - ${movie.year}</div>
          </div>
        </div>
      `;
        container.appendChild(movieDiv);
    });
}

// Función para abrir el modal con la película
function openMovieModal(url) {
    const modal = document.getElementById("movieModal");
    const iframe = document.getElementById("movieFrame");

    // Asignar la URL del video al iframe del modal
    iframe.src = url;

    // Mostrar el modal
    modal.style.display = "flex";
}

// Cerrar el modal cuando se hace clic en "X"
document.querySelector(".close").onclick = function () {
    const modal = document.getElementById("movieModal");
    const iframe = document.getElementById("movieFrame");

    modal.style.display = "none";
    iframe.src = "";  // Limpiar el iframe para detener el video
}

// Cerrar el modal cuando se hace clic fuera del modal
window.onclick = function (event) {
    const modal = document.getElementById("movieModal");
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("movieFrame").src = "";  // Limpiar el iframe
    }
}



// Asegurarse de que el modal esté oculto al cargar la página
window.onload = function () {
    const modal = document.getElementById("movieModal");
    modal.style.display = "none";  // Asegura que el modal esté oculto al cargar
};

