const movies = [];

class Carousel {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentIndex = 0;
    this.cards = this.container.querySelectorAll(".card");
    this.viewportWidth = this.container.parentElement.offsetWidth;
  }

  updatePosition() {
    let previousWidth = 0;

    for (let i = 0; i < this.cards.length; i++) {
      if (this.currentIndex == i) {
        this.cards[i].classList.add("active");
      } else {
        this.cards[i].classList.remove("active");
        if (i < this.currentIndex) {
          let width =
            parseFloat(window.getComputedStyle(this.cards[i]).marginRight) +
            this.cards[i].offsetWidth +
            parseFloat(window.getComputedStyle(this.cards[i]).marginLeft);
          previousWidth += width;
        }
      }
    }

    const activeWidth =
      this.cards[this.currentIndex].offsetWidth +
      parseFloat(
        window.getComputedStyle(this.cards[this.currentIndex]).marginLeft
      ) +
      parseFloat(
        window.getComputedStyle(this.cards[this.currentIndex]).marginRight
      );
    const centering = this.viewportWidth / 2 - activeWidth / 2;
    const translate = previousWidth - centering;

    if (this.cards[this.currentIndex] == this.cards[0]) {
      this.container.style.transform = "translateX(0)";
    } else {    
      this.container.style.transform = "translateX(-" + translate + "px)";
    }
  }

  moveRight() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.updatePosition();
    }
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePosition();
    }
  }
}

function addArr(movie) {
  movies.push(movie);
}

function triGender() {
  let genderMovies = {}

  for (let movie of movies) {
    if (!genderMovies[movie.genre]) {
      genderMovies[movie.genre] = []
    } 
    genderMovies[movie.genre].push(movie)
  }
  return genderMovies
}

function displayMovies(filmsArray, container) {

  container.innerHTML = ""

  for (let movie of filmsArray) {
    const newCard = card(movie);
    container.appendChild(newCard);
  }
}

function carouselContainer (groupeMovies) {
  const container = document.getElementById("carousels")

  for (let gender in groupeMovies) {
    const newContainer = document.createElement("div")
    newContainer.className = ''
    newContainer.id = `${gender}`
    container.appendChild(newContainer)

    const title = document.createElement("h3")
    title.innerHTML = gender
    newContainer.appendChild(title)

    const newCarousel = document.createElement("div")
    newCarousel.className = "carousel"
    newContainer.appendChild(newCarousel)

    displayMovies(groupeMovies[gender], newCarousel)

    const instanceCarousel = new Carousel(newCarousel)
    instanceCarousel.updatePosition()


    const btnLeft = document.createElement("button")
    btnLeft.type = "button"
    btnLeft.id = `left${gender}`
    btnLeft.className = "left"
    btnLeft.innerHTML = "<"
    btnLeft.className ="left"
    newContainer.appendChild(btnLeft)

    const btnRight = document.createElement("button")
    btnRight.type = "button"
    btnRight.id = `right${gender}`
    btnRight.className = "right"
    btnRight.innerHTML = ">"
    btnRight.className ="right"
    newContainer.appendChild(btnRight)

    btnLeft.addEventListener("click", () => instanceCarousel.moveLeft())
    btnRight.addEventListener("click", () => instanceCarousel.moveRight())
  }
}

function card(movie) {
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.innerHTML = `
    <img src="${movie.image}" alt="${movie.titre}" class="">
    <div>
        <h4>${movie.titre}</h4>
    </div>
    `
    return newCard
}

function addActorFunction() {
  const maxActors = 10;
  const inputs = document.querySelectorAll('input[name="actorInput"]');
  const container = document.getElementById("formActor");

  if (inputs.length < maxActors) {
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "actorInput";
    newInput.className = "actorInput";
    container.appendChild(newInput);
  } else {
    alert("Limite de 10 acteurs atteinte");
  }
}

function newMovie(e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const genre = document.getElementById("gender").value.trim();
  const date = Number(document.getElementById("date").value.trim());
  const real = document.getElementById("real").value.trim();
  const picture = document.getElementById("posterUrl").value;
  const actorsListe = document.querySelectorAll('input[name="actorInput"]');
  const actorsArray = [];

  for (let actor of actorsListe) {
    const actorValue = actor.value.trim();
    if (actorValue != "") {
      actorsArray.push(actorValue);
    } else {
      continue;
    }
  }

  const movie = {
    titre: title,
    date: date,
    realisateur: real,
    description: description,
    genre: genre,
    acteurs: actorsArray,
    image: picture,
    id: `${title}-${date}`,
  };

  if (movie.titre == "" || movie.genre == "") {
    alert("Manque de données essentiel");
  } else {
    movies.push(movie);
    initApp()
    e.target.reset();
  }

  const form = document.getElementById("addMovieForm");
  form.style.display = "none";

}

function banner () {  
  const imageContainerTop = document.getElementById("imageContainerTop");  
  const index = Math.floor(Math.random() * movies.length);
  
  imageContainerTop.style.backgroundImage = `url(${movies[index].image})`;
  imageContainerTop.style.backgroundSize = "cover";
  imageContainerTop.style.backgroundPosition = "center";
} 

function infos() {
  const titleContainer = document.getElementById("titleContainer");
  const dateContainer = document.getElementById("dateContainer");
  const realContainer = document.getElementById("realContainer");
  const descriptionContainer = document.getElementById("descriptionContainer");
  const genreContainer = document.getElementById("genreContainer");
  const actorsContainer = document.getElementById("actorsContainer");
  const imageContainer = document.getElementById("imageContainer");

  const index = Math.floor(Math.random() * movies.length);

  const actorsHTML = movies[index].acteurs.map((actor) => `<li>${actor}</li>`).join("");


  titleContainer.innerHTML = `<h3>${movies[index].titre}</h3>`;
  dateContainer.innerHTML = `<h5>${movies[index].date}</h5>`;
  realContainer.innerHTML = `<h5>${movies[index].realisateur}</h5>`;
  descriptionContainer.innerHTML = `<p>${movies[index].description}</p>`;
  genreContainer.innerHTML = `<h5>${movies[index].genre}</h5>`;
  actorsContainer.innerHTML = `<ul>${actorsHTML}</ul>`;
  imageContainer.innerHTML = `<img src="${movies[index].image}" alt="${movies[index].titre}" class="">`;
}

function slideDown () {
  const container = document.getElementById("carousels")
  if (container.classList.contains("slideDown")){
    container.classList.remove("slideDown")
    container.style.height = "59vh"
  } else {
    container.classList.add("slideDown")
    container.style.height = "auto"
  }
}

function allMovies() {
  const container = document.getElementById("ResultLinkToMovie")

  for (let movie of movies) {
    const linkContainer = document.createElement("div")
    linkContainer.className = "LinkToMovie"
  
    container.appendChild(linkContainer)

    const newLink = document.createElement("a")
    newLink.href = "./one_movie.html"
    newLink.className = "tendencePoster"

    linkContainer.appendChild(newLink)
  
    const linkImg = document.createElement("img")
    linkImg.src = movie.image
    linkImg.alt = movie.titre
    linkImg.className = "tendanceImage"

    newLink.appendChild(linkImg)

    const infosContaine = document.createElement("div")
    infosContaine.className = "movieInfo"

    linkContainer.appendChild(infosContaine)

    const title = document.createElement("h4")
    title.innerHTML = movie.titre

    infosContaine.appendChild(title)

    const infos = document.createElement("p")
    infos.innerHTML = `${movie.date} - ${movie.realisateur}`

    infosContaine.appendChild(infos)
  }
}

function displayForm () {
  const form = document.getElementById("addMovieForm")

  form.style.display = "block"
}

const slide = document.getElementById("slideBtn");
const add = document.getElementById("addActorBtn");
const form = document.getElementById("addCard");
const btnForm = document.getElementById("addMovie")

if (add) {
  add.addEventListener("click", addActorFunction);
}

if (form) {
  form.addEventListener("submit", newMovie);
}

if (slide) {
  slide.addEventListener("click", slideDown);
}

if (btnForm) {
  btnForm.addEventListener("click", displayForm);
}