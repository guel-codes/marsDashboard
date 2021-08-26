let store = {
    user: { name: "Astronaut" },
    rovers: ['Curiosity', 'Opportunity', 'Spirit']
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

const App = (state) => {
    return `
        <header></header>
        <main>
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
        </main>
        <footer></footer>
    `
}

roverNames = store.rovers // pull list from the store

roverNames.forEach((roverName) => {
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data =>
            updateStore(roverName, data.roverPhotos.latest_photos[0]))
})

function onClick(roverName) {
    document.getElementById(roverName).innerHTML = store[roverName].rover.landing_date
}