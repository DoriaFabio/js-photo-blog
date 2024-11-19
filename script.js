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

const baseUrl = "https://jsonplaceholder.typicode.com";
const resource = "/photos";
const endpoint = baseUrl + resource;
const params = { "_limit": 6 };
const card = document.getElementById("card");

function getData() {
    const arrayName = [];
    let template = ``;
    for (let i = 0; i < 6; i++) {
        axios.get(baseUrl + resource, { params }).then((res) => {
            console.log(res.data);
            const image = res.data[i].url;
            console.log(image);
            const text = res.data[i].title;
            console.log(text);
            template += `
            <div class="col d-flex flex-column">
                <img id="pin" src="./img/pin.svg" alt="Pallino">
                <div class="img">
                    <img src="${image}" alt="Foto">
                </div>
                <div class="text">
                    <p>${text}</p>
                </div>
                </div>
            `;
            arrayName.push(res.data);
            if (arrayName.length === 6) {
                card.innerHTML = template;
            };
        })
            .catch((error) => {
                console.log(error);
            })

            .finally(() => {
                console.log("in tutti i casi eseguita");
            });
    };
}
getData();