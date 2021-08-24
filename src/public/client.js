// self.importScripts("https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js" );

let store = {
    user: { name: "Astronaut" },
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roverData: [],
}

const updateStore = (data) => {
    let storeRoverData = data

    newState = {
        user: { name: "Astronaut" },
        rovers: ['Curiosity', 'Opportunity', 'Spirit'],
        roverData: [storeRoverData],
    }

    store = Object.assign(store, newState)
}
console.log(store)
const root = document.getElementById('root')

// root.innerHTML = `<section> <img src="${store.roverPhotos}" height="350px" width="100%"/> </section>`
// const render = async (root, state) => {
// root.innerHTML = latest_photos
// }


// const App = (state) => {
//     let { rover } = state

//     return `
//         <header></header>
//         <main>
//             <section>
//                 ${getRoverData(rover)}
//             </section>
//         </main>
//         <footer></footer>
//     `
// }

// create content
// const App = (state) => {
//     let { roverName, apod } = state

//     return `
//         <header></header>
//         <main>
//             ${Greeting(store.user.name)}
//             <section>
//                 <h3>Put things on the page!</h3>
//                 <p>Here is an example section.</p>
//                 <p>
//                     One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
//                     the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
//                     This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
//                     applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
//                     explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
//                     but generally help with discoverability of relevant imagery.
//                 </p>
//                 ${ImageOfTheDay(apod)}
//             </section>
//             <section>
//                 ${RoverInfo(roverName)}
//             </section>
//             <section>
//                 ${RoverPhotos(roverName)}
//             </section>
//         </main>
//         <footer></footer>
//     `
// }

// listening for load event because page should load before any JS is called

window.addEventListener('load', () => {
    // render(root, store) 
}) 



// // ------------------------------------------------------  COMPONENTS

// // Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//     if (name) {
//         return `
//             <h1>Welcome, ${name}!</h1>
//         `
//     }

//     return `
//         <h1>Hello!</h1>
//     `
// }

// Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!apod || apod.date === today.getDate() ) {
//         getRoverInfo(store)
//     }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         return (`
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `)
//     }
// }


// ------------------------------------------------------  API CALLS

// // Example API call
// const getImageOfTheDay = (state) => {
//     let { apod } = state

//     fetch(`http://localhost:3000/apod`)
//         .then(res => res.json())
//         .then(apod => updateStore(store, { apod }))

//     return data
// }

// const getRoverInfo = (state) => {
//     let { rover } = state
//     fetch(`http://localhost:3000/rovers/:name/photos`)
//         .then(res => res.json())
//         .then(rover => updateStore(store, { rover }))
        
//     return data
// }

roverNames = store.rovers // pull list from the store

roverNames.forEach((roverName) =>{
    allRoverInfo = []
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data => {
            allRoverInfo.push(data.roverPhotos.latest_photos[0]) 
              
    })
    updateStore(allRoverInfo)
})



// root.innerHTML = `<section> <img src="${data.roverPhotos.latest_photos[0].img_src}" height="350px" width="100%"/> </section>


///////FRONT END ANIMATION////////
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xFFBD00, 8, 30);
const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth / window.innerHeight,
0.1,
1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
antialias: true,
alpha: true // Make the scene transparent
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let materials = [
new THREE.MeshBasicMaterial({color:0xFF61AD,wireframe:true}),
new THREE.MeshBasicMaterial({color:0xFF5BDB,wireframe:true}),
new THREE.MeshBasicMaterial({color:0xFFAC63,wireframe:true}),
new THREE.MeshBasicMaterial({color:0xFF8282,wireframe:true})
];
let geometry = new THREE.IcosahedronGeometry(1, 1);
for (let i = 0; i < 30; i ++) {
const mesh = new THREE.Mesh(geometry, materials[Math.floor(Math.random() * 4)]);
const scale = Math.random() + 0.5;
mesh.scale.multiplyScalar(scale);
mesh.position.random().subScalar(0.5).multiplyScalar(15);
mesh.speed = new THREE.Vector3().random().subScalar(0.5).multiplyScalar(0.01);
scene.add(mesh);
}

function render(a) {
scene.children.forEach(mesh => {
    mesh.rotation.x += mesh.speed.x;
    mesh.rotation.y += mesh.speed.y;
    mesh.rotation.z += mesh.speed.z;
});
renderer.render(scene, camera);
}
renderer.setAnimationLoop(render);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}

