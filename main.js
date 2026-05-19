const api = `https://www.omdbapi.com/?s=batman&apikey=c65fcde9`;
const getOneApi = `https://www.omdbapi.com/?apikey=c65fcde9&i=tt1285016`;
const elLoading = document.querySelector(".loading");
const elList = document.querySelector(".list");

const elInput = document.querySelector(".input");
const elBtn = document.querySelector(".s-btn");

const getData = (url) => {
  elLoading.innerHTML = "Loading...";
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => showData(data))
    .finally(() => {
      elLoading.innerHTML = "";
    });
};

getData(api);

const searchMovies = () => {
  const query = elInput.value.trim();

  if (query !== "") {
    const newApi = `https://www.omdbapi.com/?s=${query}&apikey=c65fcde9`;
    getData(newApi);
  }
};

elBtn.addEventListener("click", searchMovies);

function showData(movies) {
  elList.innerHTML = "";

  if (movies.Response === "True") {
    const { Search } = movies;
    Search.forEach((element) => {
      const { Poster, Title, Type, Year, imdbID } = element;
      console.log(element);

      elList.innerHTML += `
          <div class="card">
          <img class="poster" src="${Poster}" />
          <h4 class="title">${Title.slice(0, 17)}...</h4>
          <p class="year">${Year}</p>
          <p class="type">${Type}</p>
          <button class="s-btn" onclick="getOneMovies('${imdbID}')">More information</button>
          </div>
      `;
    });
  } else {
    elList.innerHTML = `<p class="loading">Ничего не найдено по этому запросу</p>`;
  }
}

// Modal

const modal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModal");

function openModal() {
  overlay.classList.add("active");
}

function closeModal() {
  overlay.classList.remove("active");
  modal.innerHTML = "";
}

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("active")) {
    closeModal();
  }
});

function getOneMovies(id) {
  fetch(`https://www.omdbapi.com/?apikey=c65fcde9&i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        const {
          Title,
          Year,
          Poster,
          Director,
          Runtime,
          Released,
          Rated,
          Writer,
          Actors,
          Plot,
          Genre,
          Type,
        } = data;

        modal.innerHTML = `
        <div class="modal-content">
          <div>
            <img class="img" src="${Poster}" alt="${Title}" />
          </div>
          <div class="info">
            <h1><span class="title-span">Title :</span> ${Title}</h1>
            <p><span class="year-span">Year :</span> ${Year}</p>
            <p><span class="rated-span">Rated :</span> ${Rated}</p>
            <p><span class="rel-span">Released :</span> ${Released}</p>
            <p><span class="dirc-span">Director :</span> ${Director}</p>
            <p><span class="run-span">Runtime :</span> ${Runtime}</p>
            <p><span class="writer-span">Writer :</span> ${Writer}</p>
            <p><span class="actors-span">Actors :</span> ${Actors}</p>
            <p><span class="plot-span">Plot :</span> ${Plot}</p>
            <p><span class="genre-span">Genre :</span> ${Genre}</p>
            <p><span class="genre-span">Type :</span> ${Type}</p>
          </div>
        </div>
        `;

        openModal();
      } else {
        alert("Filmni malumoti topilmadi");
      }
    });
}
