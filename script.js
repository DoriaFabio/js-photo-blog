// *CONSEGNA*
// *Milestone 1*
// Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
// *Milestone 2*
// Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
// https://jsonplaceholder.typicode.com/photos?_limit=6
// Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
// *Milestone 3*
// Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!
// *Bonus*
// rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata

// ? Font: Edu task beginner 

console.clear();

//! Api URL 
const baseUrl = "https://jsonplaceholder.typicode.com";
// //! Endpoint
const resource = "/photos";
const endpoint = baseUrl + resource;
// //! Params
let randomNumber = Math.floor(Math.random() * 5000);
let randomNumberDue = Math.floor(Math.random() * 5000);
const paramsOne = `?_start=${randomNumberDue}&_limit=1`;

//!  costanti
const card = document.getElementById("card");
const closeButton = document.getElementById("close");
// const addButton = document.getElementById("add");
const deleteButton = document.getElementById("delete");
const overlay = document.getElementById("overlay");
const imgOverlay = document.getElementById("imgOver");
let selPhoto;

//! Stampare le card

function getData(param = `?_start=${randomNumber}&_limit=6`) {
    // limite di 6
    axios.get(endpoint + param).then((res) => {    //! chiamata axios
        const photos = res.data;
        console.log(photos);
        const template = photos.map((photo) => {
            const { id, title, url } = photo          //! Destrutturazione
            return `
            <figure id="${id}" class="col d-flex flex-column">
              <img id="pin" src="./img/pin.svg" alt="Pallino">
              <div class="img">
                  <img src="${url}" alt="${title}">
              </div>
              <div class="text">
                <p>${title}</p>
            </div>
          </figure>
            `;
        }).join("");
        card.innerHTML += template;
        getFigures(photos);
    })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log("in tutti i casi eseguita");
        });

    //todo Soluzione con un ciclo for 

    // for (let i = 0; i < 6; i++) {
    //     const arrayName = [];
    //     let templat = "";
    //     axios.get(baseUrl + resource, { params }).then((res) => {
    //         console.log(res.data);
    //         const image = res.data[i].url;
    //         console.log(image);
    //         const text = res.data[i].title;
    //         console.log(text);
    //         template += `
    //         <div id="imagecard"  class="col d-flex flex-column">
    //             <img id="pin" src="./img/pin.svg" alt="Pallino">
    //             <div class="img">
    //                 <img src="${image}" alt="Foto">
    //             </div>
    //             <div class="text">
    //                 <p>${text}</p>
    //             </div>
    //             </div>
    //         `;
    //         arrayName.push(res.data);
    //         getFigures();
    //         if (arrayName.length === 6) {
    //             card.innerHTML = template;
    //         };
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    //         .finally(() => {
    //             console.log("in tutti i casi eseguita");
    //         });
    // };
}

//! Overlay foto 
function getFigures(p) {
    let figures = document.querySelectorAll("figure");
    console.log(figures);
    figures.forEach((figure) => {
        figure.addEventListener("click", function () {
            console.log(figure.id);
            overlay.classList.remove("d-none");
            selPhoto = p.find((el) => el.id === parseInt(figure.id));
            console.log(selPhoto);
            imgOverlay.src = selPhoto.url;
            imgOverlay.alt = selPhoto.title;
        });
    });
    closeButton.addEventListener("click", function () {
        overlay.classList.add("d-none");
    });
    deleteButton.addEventListener("click", function () {
        // console.log("Ciao");
        overlay.classList.add("d-none");
        console.log(selPhoto);
        figures.forEach((el) => {
            console.log(el);
            if (el.id == selPhoto.id) {
                el.remove();
            }
        });

        figures = document.querySelectorAll("figure");
        console.log(figures);
    });
}

//! Bottone aggiungi card

// addButton.addEventListener("click", function () {
//     getData(paramsOne);
// });

getData();