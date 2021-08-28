let store = {
    user: { name: "Astronaut" },
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    roverFactsDict: {}
}

const roverNames = store.rovers
const root = document.getElementById('root')
const roverFacts = {
    Curiosity: "The rover's goals include an investigation of the Martian climate and geology, assessment of whether the selected field site inside Gale has ever offered environmental conditions favorable for microbial life (including investigation of the role of water), and planetary habitability studies in preparation for human exploration.",
    Opportunity: "Mission highlights included the initial 90-sol mission, finding meteorites such as Heat Shield Rock (Meridiani Planum meteorite), and over two years of exploring and studying Victoria crater.",
    Spirit: "The rover completed its planned 90-sol mission (slightly less than 92.5 Earth days). Aided by cleaning events that resulted in more energy from its solar panels, Spirit went on to function effectively over twenty times longer than NASA planners expected.",
}

roverNames.map((rover) => {
    store.roverFactsDict[rover] = roverFacts[rover]
})

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
        <p>${getRoverFact(roverName)}</p>
    </section>
    <div style="color: white">Latest Photo: </p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover" width="500" height="500"/>
    </div>
    `
}

const getRoverFact = (roverName) => {
    return store.roverFactsDict[roverName]
}

function onClick(roverName) {
    cardStyling(roverName)
}

roverNames.forEach((roverName) => {
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data =>
            updateStore(roverName, data.roverPhotos.latest_photos[0]))
})




