let store = {
    user: { name: "Astronaut" },
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

const updateStore = (data) => {
    let storeRoverData = data

    newState = {
        user: { name: "Astronaut" },
        rovers: ['Curiosity', 'Opportunity', 'Spirit'],
        roverData: storeRoverData,
    }

    store = Object.assign(store, newState)
}

window.addEventListener('load', () => {
    // render(root, store) 
})

roverNames = store.rovers // pull list from the store

roverNames.forEach((roverName) => {
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data => updateStore(data.roverPhotos.latest_photos[0]))
})

console.log(store.roverData)

function curClick() {
    // document.getElementById('curRover').style.opacity = "0"
    document.getElementById('curRover').innerHTML = `<div>${store.roverData.rover.landing_date}</div>`
        // card = document.querySelector('#container')
        // card.style.display = 'none'
}

function oppClick() {
    alert('This is the Opportunity Rover')
        // card.style.display = 'none'
}

function spirClick() {
    alert('This is the Spirit Rover')
        // card = document.querySelector('#container')
        // card.style.display = 'none'
}