class ListaSeries extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.series = [];
    }

    connectedCallback() {
        this.cargarSeries();

        this.addEventListener("busqueda", (evento) => {
            const filtro = evento.detail.toLowerCase();
            this.filtrar(filtro);
        });
    }

    async cargarSeries() {
        try {
            const response = await fetch('data/trilogias.json');
            const data = await response.json();


            for (const trilogia in data.trilogias) {
                const seriesDeTrilogia = data.trilogias[trilogia];
                seriesDeTrilogia.forEach(serie => {
                    this.series.push({ ...serie, trilogia });
                });
            }

            this.renderTarjetas(this.series);
        } catch (error) {
            this.renderError();
            console.error('Error cargando series:', error);
        }
    }


    filtrar(filtro) {
        const filtradas = this.series.filter((serie) =>
            serie.titulo.toLowerCase().includes(filtro)
        );
        this.renderTarjetas(filtradas);
    }

    renderTarjetas(series) {
        this.shadowRoot.innerHTML = `
        <style>
          .trilogia-title {
            font-size: 1.5rem;
            margin-top: 20px;
            text-align: center;
            color: #FFE81F;
          }
          .cuadro {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            padding: 2rem;
          }
          .tarjeta {
            width: 200px;
            background-color: #3e565994;
            border: 1px solid white;
            color: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 2px 2px 6px black;
            text-align: center;
            font-family: Arial;
          }
          .tarjeta img {
            width: 100%;
            border-radius: 6px;
          }
          .tarjeta p {
            margin: 8px 0;
            font-size: 16px;
            color: #8097A6;
          }
          .ver {
            display: inline-block;
            margin-top: 10px;
            padding: 6px 12px;
            background-color: #FFE81F;
            color: black;
            border-radius: 4px;
            text-decoration: none;
            
          }
        </style>
        <div class="cuadro" id="series-container"></div>
      `;

        const container = this.shadowRoot.querySelector("#series-container");
        container.innerHTML = "";

        series.forEach((serie) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");
            tarjeta.innerHTML = `
          <img src="${serie.imagen}" alt="${serie.titulo}">
          <p>${serie.titulo}</p>
          <p class="trilogia-title">${serie.trilogia}</p>
          <a class="ver" href="${serie.link}" target="_blank">Ver</a>
        `;
        tarjeta.addEventListener("mouseover",()=>{
          tarjeta.style.transform="scale(1.05)";
          tarjeta.style.transition="transform 0.3s ease"
        })
        tarjeta.addEventListener("mouseout",()=>{
          tarjeta.style.transform="scale(1)"
        })
            container.appendChild(tarjeta);
        });
    }

    renderError() {
        this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar las series.</p>`;
    }
}

customElements.define("lista-series", ListaSeries);
