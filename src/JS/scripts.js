
const movies = [];

function card (movie) {
    const newCard = document.createElement('div');
    const actorsHTML = movie.acteurs.map(acteur => `<li>${acteur}</li>`).join('');
    newCard.className = 'smallPoster';
    newCard.innerHTML = `
    <img src="${movie.image}" alt="${movie.titre}" class="">
    <div>
        <h4>${movie.titre}</h4>
        <p>${movie.genre}</p>
        <p>${movie.description}</p>
        <ul>
            ${actorsHTML}
        </ul>
    </div>
    `;
    return newCard;
}

class carrousel {
    constructor(containerElement) {
        this.container = containerElement
        this.currentIndex = 0
        this cards = 
    }
}


function displayMovies (movie) {
    const container = document.getElementById('carrousel')

    for (let movie of movies) {
        const newCard = card(movie)
        container.appendChild(newCard)
    }
}


function carrouselPosition () {
    const container = document.getElementById('carrousel')
    const viewportWidth = container.offsetWidth
    const cards = container.querySelectorAll('.card')
    let previousWidth = 0

    for (let i = 0; i < cards.length; i++) {
        if (currentIndex == i) {
            cards[i].classList.add('active')
        } else {
            cards[i].classList.remove('active')
            if (i < currentIndex) {
                let width = parseFloat(window.getComputedStyle(cards[i]).marginRight) + cards[i].offsetWidth + parseFloat(window.getComputedStyle(cards[i]).marginLeft)
                previousWidth += width
            }
        }
    }

    const activeWidth = cards[currentIndex].offsetWidth + parseFloat(window.getComputedStyle(cards[currentIndex]).marginLeft) + parseFloat(window.getComputedStyle(cards[currentIndex]).marginRight)
    const centering = viewportWidth / 2 - activeWidth / 2
    const translate = previousWidth - centering
    
    container.style.transform = 'translateX(-' + translate + 'px)'

}


function right () {
   if (currentIndex < movies.length - 1) {
    currentIndex ++
    carrouselPosition()
   } else {
    return
   }
}

function left () {
    if (currentIndex > 0) {
        currentIndex --
        carrouselPosition()
    } else {
        return
    }
}

function addActorFunction () {
    const maxActors = 10
    const inputs = document.querySelectorAll('input[name="actorInput"]')
    const container = document.getElementById('FormActor')
    
    if (inputs.length < maxActors) {
        const newInput = document.createElement('input')
        newInput.type = 'text'
        newInput.name = 'actorInput'
        newInput.className = 'actorInput'
        container.appendChild(newInput)
    } else {
        alert("Limite de 10 acteurs atteinte")
        }
}

function newMovie (e) {
    e.preventDefault()
    const title = document.getElementById('titre').value.trim()
    const description = document.getElementById('description').value.trim()
    const genre = document.getElementById('genre').value.trim()
    const picture = document.getElementById('image').value
    const actorsListe = document.querySelectorAll('input[name="actorInput"]')
    const actorsArray = []
    const id = Date.now()
    
    
    for (let actor of actorsListe) {
        const actorValue = actor.value.trim();
        if (actorValue != '') {
            actorsArray.push(actorValue)
        } else {continue}
    }

    const movie = {
        titre: title,
        description: description,
        genre: genre,
        acteurs: actorsArray,
        image: picture,
        id: id
    }
    
    if (movie.titre =='' || movie.genre == '') {
        alert("Manque de données essentiel")
    } else {
        movies.push(movie)
        const container = document.getElementById('carrousel')
        const newCard = card(movie)
        container.appendChild(newCard)
        e.target.reset()
    }
    
}

const btnRight = document.getElementById('right')
const btnLeft = document.getElementById('left')

const add = document.getElementById('addActorBtn')
const form = document.getElementById('addCard')

if (add) {
    add.addEventListener('click', addActorFunction)
}

if (form) {
    form.addEventListener('submit', newMovie)
}

if (btnRight) {
    btnRight.addEventListener('click', right)
}

if (btnLeft) {
    btnLeft.addEventListener('click', left)
}