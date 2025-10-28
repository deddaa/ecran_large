const movies = [];

class carrousel {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentIndex = 0;
    this.cards = this.container.querySelectorAll(".card");
    this.viewportWidth = this.container.offsetWidth;
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

    this.container.style.transform = "translateX(-" + translate + "px)";
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

function carrouselContainer (groupeMovies) {
  const container = document.getElementById("carrousels")

  for (let gender in groupeMovies) {
    const newContainer = document.createElement("div")
    newContainer.className = ''
    newContainer.id = `${gender}`
    container.appendChild(newContainer)

    const title = document.createElement("h3")
    title.innerHTML = gender
    newContainer.appendChild(title)

    const newCarrousel = document.createElement("div")
    newCarrousel.className = "carrousel"
    newContainer.appendChild(newCarrousel)

    displayMovies(groupeMovies[gender], newCarrousel)

    const instanceCarrousel = new carrousel(newCarrousel)
    instanceCarrousel.updatePosition()


    const btnLeft = document.createElement("button")
    btnLeft.type = "button"
    btnLeft.id = `left${gender}`
    btnLeft.innerHTML = "<"
    newContainer.appendChild(btnLeft)

    const btnRight = document.createElement("button")
    btnRight.type = "button"
    btnRight.id = `right${gender}`
    btnRight.innerHTML = ">"
    newContainer.appendChild(btnRight)

    btnLeft.addEventListener("click", () => instanceCarrousel.moveLeft())
    btnRight.addEventListener("click", () => instanceCarrousel.moveRight())
  }
}

function initApp() {
  const groupeMovies = triGender()

  carrouselContainer(groupeMovies)
}

fetch("../data/films.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((movie) => {
      addArr(movie);
    });
    initApp()
  })
  .catch((error) => {
    console.error("Erreur de chargement du fichier JSON :", error);
  });

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

// function carrouselPosition() {
//   // const container = document.getElementById('carrousel')
//   // const viewportWidth = container.offsetWidth
//   // const cards = container.querySelectorAll('.card')
//   // let previousWidth = 0

//   for (let i = 0; i < cards.length; i++) {
//     if (currentIndex == i) {
//       cards[i].classList.add("active");
//     } else {
//       cards[i].classList.remove("active");
//       if (i < currentIndex) {
//         let width =
//           parseFloat(window.getComputedStyle(cards[i]).marginRight) +
//           cards[i].offsetWidth +
//           parseFloat(window.getComputedStyle(cards[i]).marginLeft);
//         previousWidth += width;
//       }
//     }
//   }

//   const activeWidth =
//     cards[currentIndex].offsetWidth +
//     parseFloat(window.getComputedStyle(cards[currentIndex]).marginLeft) +
//     parseFloat(window.getComputedStyle(cards[currentIndex]).marginRight);
//   const centering = viewportWidth / 2 - activeWidth / 2;
//   const translate = previousWidth - centering;

//   container.style.transform = "translateX(-" + translate + "px)";
// }

// function right() {
//   if (currentIndex < movies.length - 1) {
//     currentIndex++;
//     carrouselPosition();
//   } else {
//     return;
//   }
// }

// function left() {
//   if (currentIndex > 0) {
//     currentIndex--;
//     carrouselPosition();
//   } else {
//     return;
//   }
// }

function addActorFunction() {
  const maxActors = 10;
  const inputs = document.querySelectorAll('input[name="actorInput"]');
  const container = document.getElementById("FormActor");

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
  const title = document.getElementById("titre").value.trim();
  const description = document.getElementById("description").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const picture = document.getElementById("image").value;
  const actorsListe = document.querySelectorAll('input[name="actorInput"]');
  const actorsArray = [];
  const id = Date.now();

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
    description: description,
    genre: genre,
    acteurs: actorsArray,
    image: picture,
    id: id,
  };

  if (movie.titre == "" || movie.genre == "") {
    alert("Manque de données essentiel");
  } else {
    movies.push(movie);
    initApp()
    e.target.reset();
  }

}

const add = document.getElementById("addActorBtn");
const form = document.getElementById("addCard");

if (add) {
  add.addEventListener("click", addActorFunction);
}

if (form) {
  form.addEventListener("submit", newMovie);
}