
class ListaPlanetas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.planetas = [];
        this.imagenes = ["multimedia/tatooine.jpeg", "multimedia/alderaan.jpeg", "multimedia/yavin-4.jpeg", "multimedia/Hoth.jpeg", "multimedia/Dagobah.jpeg", "multimedia/Bespin.jpeg", "multimedia/Endor.jpeg", "multimedia/Naboo.jpeg", "multimedia/Coruscant.jpeg", "multimedia/kamino.jpeg"
        ];
    }
    connectedCallback() {
        this.cargarPlanetas();

        this.addEventListener("busqueda", (eventoMensaje) => {
            console.log(eventoMensaje.detail);
            const filtro = eventoMensaje.detail;
            this.filtrar(filtro);
        });
    }
    async cargarPlanetas() {
        try {
            const respuesta = await fetch('https://swapi.py4e.com/api/planets/');
            const datos = await respuesta.json();
            this.planetas = datos.results;
            this.render(this.planetas);
            this.renderTarjetas(this.planetas);
        } catch (error) {
            this.renderError();
        }
    }
    filtrar(filtro) {
        const filtrados = this.planetas.filter(planeta =>
            planeta.name.toLowerCase().includes(filtro)
        );
        this.renderTarjetas(filtrados)
    }
    renderError() {
        this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar los personajes</p>`;
    }



    render(planetas) {

        this.shadowRoot.innerHTML = `
        <style>
         .contenedor{
        display:flex;
        gap:2vh;
        padding:5vh;
        width:100%;
        box-sizing:border-box;
    }
        .planeta-espa-tarjeta{
        display:grid;
        grid-template-columns:1fr 1fr 1fr 1fr 1fr;
        gap:16px;
        padding:0;
        padding:5vh;
        width:100%;
        justify-content: space-around;
        }
        .planeta-tarjeta{
            text-align:center;
            background-color: #3e565994;
            border:1px solid #ccc;
            color:yellow;
            line-height: 1rem;
            border-radius:8px;
            padding:16px;
            box-shadow:2px 2px 6px black;
            font-family:Arial;
        }
        .tarjetas h3{
            font-size:20px;
            color:yellow;
        }
    .planeta-tarjeta p{
    margin: 4px 0;
    font-size:14px;
    color: white;
    }
    .planeta-tarjeta img{
    width:100%
    }
   
    
        </style>
        <div class="contenedor">
            <div class="planeta-espa-tarjeta" id="planets-container"></div>
            <div class="imagen-planeta">
            </div>
        </div>
    `
        const container = this.shadowRoot.querySelector('#planets-container')
        let contador = 0;
        planetas.forEach(planeta => {

            const tarjetas = document.createElement('div');
            tarjetas.classList.add('planeta-tarjeta');
            tarjetas.innerHTML = `
        <img src="${this.imagenes[contador]}" alt="${planeta.name}">
        <h3>${planeta.name}</h3>
        <p>${planeta.climate}</p>
        <p>${planeta.gravity}</p>
        <p>${planeta.terrain}</p>
        `;
            contador = contador + 1;
            container.appendChild(tarjetas);

        })
    }
    renderTarjetas(planetas) {
        let contador = 0;
        const container = this.shadowRoot.querySelector("#planets-container");
        container.innerHTML = '';
        planetas.forEach(planeta => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('planeta-tarjeta');
            tarjeta.innerHTML = `
        <img src="${this.imagenes[contador]}" alt="${planeta.name}">
        <h3>${planeta.name}</h3>
        <p><strong>Clima:</strong> ${planeta.climate}</p>
        <p><strong>Gravedad:</strong> ${planeta.gravity}</p>
        <p><strong>Terreno:</strong> ${planeta.terrain}</p>
        `;
            tarjeta.addEventListener("mouseover", () => {
                tarjeta.style.transform = "scale(1.05)";
                tarjeta.style.transition = "transform 0.3s ease";
            });
            tarjeta.addEventListener("mouseout", () => {
                tarjeta.style.transform = "scale(1)";
            })
            contador = contador + 1;
            container.appendChild(tarjeta);
        });

    }
};
customElements.define('lista-planetas', ListaPlanetas);
// document.addEventListener("DOMContentLoaded", () => {
//     const imgs = document.querySelectorAll(".letra");
//     if (!imgs.length) return;
//     imgs.forEach(img => {
//         img.style.opacity = "0";
//         img.style.transform = "translateY(-100px)";
//         img.style.transition = "opacity 2s ease, transform 2s ease";
//         requestAnimationFrame(() => {
//             img.style.opacity = "1";
//             img.style.transform = "translateY(0)";
//         });
//     });
// });