let store = {
    user: { name: "Astronaut" },
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit'])
}

const root = document.getElementById('root')

const updateStore = (roverName, roverData) => {
    newState = {}
    newState[roverName] = roverData
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async(root, state) => {
    root.innerHTML = App(state)
    
}

function generateDivs(){
    return `
    <div class="container">
        <div id='Curiosity' onclick="onClick('Curiosity')" class="card card0">
            <div class="border">
                <h2>Curiosity</h2>
            </div>
        </div>
        <div id='Opportunity' onclick="onClick('Opportunity')" class="card card1">
            <div class="border">
                <h2>Opportunity</h2>
            </div>
        </div>
        <div id='Spirit' onclick="onClick('Spirit')"class="card card2">
            <div class="border">
                <h2>Spirit</h2>
            </div>
        </div>
    </div>
    `
}


const App = () => {
    return `
        <main>
            ${generateDivs()}
        </main>
        <footer></footer>
    `
}

function cardStyling(roverName){
    document.getElementById(roverName).innerHTML = `
    <div><h2 class="card-title" style="color: white">Rover: ${store[roverName].rover.name}</h2></div>
    <section id:'roverInfoSection'>
        <p style="color: white">Landing Date: ${store[roverName].rover.landing_date}</p>
        <p style="color: white">Launch Date: ${store[roverName].rover.launch_date}</p>
        <p style="color: white">Rover Status: ${store[roverName].rover.status}</p>
    </section>
    <div style="color: white">Latest Photo: </p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover" width="500" height="500"/>
    </div>
    `
}

function onClick(roverName) {
    cardStyling(roverName)
}


roverNames = store.rovers // pull list from the store

roverNames.forEach((roverName) => {
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data =>
            updateStore(roverName, data.roverPhotos.latest_photos[0]))
})




