
function addActorFunction () {
    const maxActors = 10
    const inputs = document.querySelectorAll('input[name="actorInput"]')
    const containerActorInput = document.getElementById('FormActor')
    
    if (inputs.length < maxActors) {
        const newInput = document.createElement('input')
        newInput.type = 'text'
        newInput.name = 'actorInput'
        newInput.className = ''
        containerActorInput.appendChild(newInput)
    } else {
        alert("Limite de 10 acteurs atteinte")
        }
}



function newCard (e) {
    e.preventDefault()
    const titre = document.getElementById('titre').value.trim()
    const description = document.getElementById('description').value.trim()
    const genre = document.getElementById('genre').value.trim()
    const image = document.getElementById('image').value
    const acteurs = []
}

const add = document.getElementById('addActorBtn')
const form = document.getElementById('addCard')

if (add) {
    add.addEventListener('click', addActorFunction)
}

if (form) {
    form.addEventListener('submit', newCard)
}

