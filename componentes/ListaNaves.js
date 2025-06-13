class ListaNaves extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.naves = [];
        this.imagenes = ["../multimedia/sandcrawler.jpeg", "../multimedia/T-16_skyhopper.webp", "../multimedia/X-34 landspeeder.jpeg", "../multimedia/TIELN-starfighter.jpeg", "../multimedia/snowspeeder.jpeg", "../multimedia/tie-bomber.jpeg", "../multimedia/AT-AT.jpeg", "../multimedia/AT-ST.jpeg", "../multimedia/cloud-car.jpeg", "../multimedia/the-khetanna.jpeg"];
    }
    connectedCallback(){
        this.cargarNaves();

        this.addEventListener("busqueda", (eventoMensaje) => {
            console.log(eventoMensaje.detail);
            const filtro = eventoMensaje.detail;
            this.filtrar(filtro);
        });
    }
    async cargarNaves(){
        try{
            const respuesta=await fetch('https://swapi.py4e.com/api/vehicles/');
            const datos = await respuesta.json();
            this.naves = datos.results;
            this.render(this.naves);
            this.renderTarjetas(this.naves);
        }catch (error){
            this.renderError();
            console.error('Error cargando naves',error);
        }
    }

    filtrar(filtro) {
        const filtrados = this.naves.filter(nave =>
            nave.name.toLowerCase().includes(filtro)
        );
        this.renderTarjetas(filtrados);
    }
    renderError() {
        this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar las naves</p>`;
    }
    render(naves) {
        this.shadowRoot.innerHTML = `
        <style>
         .contenedor{
        display:flex;
        gap:2vh;
        padding:5vh;
        width:100%;
        box-sizing:border-box;
    }
        .nave-espa-tarjeta{
        display:grid;
        grid-template-columns:1fr 1fr 1fr 1fr 1fr;
        gap:16px;
        padding:0;
        padding:5vh;
        width:100%;
        justify-content: space-around;
        }
        .nave-tarjeta{
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
    .nave-tarjeta p{
    margin: 4px 0;
    font-size:14px;
    color: white;
    }
    .nave-tarjeta img{
    width:100%
    }
   
    
        </style>
        <div class="contenedor">
            <div class="nave-espa-tarjeta" id="naves-container"></div>
            <div class="imagen-nave">
            </div>
        </div>
        
    `
        const container=this.shadowRoot.querySelector('#naves-container')
        let contador = 0;
        naves.forEach(nave => {

            const tarjetas = document.createElement('div');
            tarjetas.classList.add('nave-tarjeta');
            tarjetas.innerHTML=`
            <img src="${this.imagenes[contador]}" alt="${nave.name}">
            <h3>${nave.name}</h3>
            <p>${nave.model}</p>
            <p>${nave.manufacturer}<p/>
            <p>${nave.passengers}</p>
            `;
            contador = contador + 1;
            container.appendChild(tarjetas);
        })
    }
    renderTarjetas(naves){
        let contador = 0;
        const container=this.shadowRoot.querySelector("#naves-container");
        container.innerHTML='';
        naves.forEach(nave=>{
            const tarjeta=document.createElement('div');
            tarjeta.classList.add('nave-tarjeta');
            tarjeta.innerHTML=`
            <img src="${this.imagenes[contador]}" alt="${nave.name}">
            <h3>${nave.name}</h3>
            <p><strong>Modelo:</strong> ${nave.model}</p>
            <p><strong>Creador:</strong> ${nave.manufacturer}</p>
            <p><strong>Pasajeros:</strong> ${nave.passengers}</p>
            `;
            contador = contador + 1;
            container.appendChild(tarjeta);
        });
    }
};
customElements.define('lista-naves', ListaNaves);
