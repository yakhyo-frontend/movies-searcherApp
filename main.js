const api = `https://www.omdbapi.com/?s=batman&apikey=c65fcde9`;
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
// const searchMovies = () => {
//   const query = elInput.value.trim();

//   if (query !== "") {
//     const newApi = `http://www.omdbapi.com/?s=${query}&apikey=c65fcde9`;
//     getData(newApi);
//   }
// };

// elBtn.addEventListener("click", searchMovies);

const searchMovies = () => {
  const query = elInput.value.trim();

  if (query !== "") {
    const newApi = `http://www.omdbapi.com/?s=${query}&apikey=c65fcde9`;
    getData(newApi);
  }
};

elBtn.addEventListener("click", searchMovies);

elInput.addEventListener("keypress", () => {
  searchMovies;
});

function showData(movies) {
  elList.innerHTML = "";

  if (movies.Response === "True") {
    const { Search } = movies;
    Search.forEach((element) => {
      const { Poster, Title, Type, Year } = element;
      console.log(element);

      elList.innerHTML += `
          <div class="card">
          <img class="poster" src="${Poster}" />
          <h4 class="title">${Title.slice(0, 17)}...</h4>
          <p class="year">${Year}</p>
          <p class="type">${Type}</p>
          </div>
      `;
    });
  } else {
    elList.innerHTML = `<p class="loading">Ничего не найдено по этому запросу</p>`;
  }
}
