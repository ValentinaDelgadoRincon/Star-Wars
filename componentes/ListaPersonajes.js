class ListaPersonajes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.personajes = [];
    }

    connectedCallback() {
        this.cargarPersonajes();


        this.addEventListener("busqueda", (eventoMensaje) => {
            console.log(eventoMensaje.detail);
            
            const filtro = eventoMensaje.detail;
            this.filtrar(filtro);
        });
    }

    async cargarPersonajes() {
        try {
            const respuesta = await fetch('https://swapi.py4e.com/api/people/');
            const datos = await respuesta.json();
            this.personajes = datos.results; 
            this.render(this.personajes);
            this.renderTarjetas(this.personajes);
        } catch (error) {
            this.renderError();
            console.error('Error cargando personajes', error);
        }
    }

    filtrar(filtro) {
        const filtrados = this.personajes.filter(personaje =>
            personaje.name.toLowerCase().includes(filtro)
        );
        this.renderTarjetas(filtrados);
    }
    
    

    renderError() {
        this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar los personajes</p>`;
    }

    render(personajes) {
        this.shadowRoot.innerHTML = `
        <style>
    .contenedor{
    display:flex;
    gap:2vh;
    padding:5vh;
    width:100%;
    box-sizing:border-box;
    }
    .espacio-tarjeta{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:16px;
    padding:0;
    padding:5vh;
    width:50%;
    }
    .tarjetas{
    text-align:center;
    background-color: #3e565994;
    border:1px solid #ccc;
    color:yellow;
    line-height: 1rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    }
    border-radius:8px;
    padding:16px;
    box-shadow:2px 2px 6px black;
    font-family:Arial;
    }
    .tarjetas h3{
    font-size:20px
    color:yellow;
    }
    .tarjetas p{
    margin: 4px 0;
    font-size:14px;
    color: white;
    }
    .video{
        flex:1;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .video video {
        width: 100%;
        max-width: 400px;
        border: 2px solid white;
        border-radius: 8px;
    }
    @media (max-width: 800px){
        .espacio-tarjeta{
        display:grid;
        grid-template-columns:1fr;
        gap:16px;
        padding:0;
        padding:0vh;
        width:50%;
        }
        .video video {
        width: 100%;
        max-width: 400px;
        border: 2px solid white;
        border-radius: 8px;
    }
        .tarjetas h3{
        font-size:10px
        color:yellow;
    }
        .tarjetas p{
        margin: 4px 0;
        font-size:10px;
        color: white;
        }
    }
    </style>
        <div class="contenedor">
            <div class="espacio-tarjeta" id="user-container"></div>
            <div class="video">
                <video src="multimedia/video-off.mp4" autoplay loop></video>
            </div>
        </div>
        `;
        const container = this.shadowRoot.querySelector('#user-container');
        personajes.forEach(personaje => {
            const tarjetas = document.createElement('div');
            tarjetas.classList.add('tarjetas');
            tarjetas.innerHTML = `
                <h3>${personaje.name}</h3>
                <p><strong>Altura:</strong> ${personaje.height} cm</p>
                <p><strong>Género:</strong> ${personaje.gender}</p>
            `;
            container.appendChild(tarjetas);
        });
    }

    renderTarjetas(personajes) {
        const container = this.shadowRoot.querySelector('#user-container');
        container.innerHTML = '';
        personajes.forEach(personaje => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjetas');
            tarjeta.innerHTML = `
                <h3>${personaje.name}</h3>
                <p><strong>Altura:</strong> ${personaje.height} cm</p>
                <p><strong>Género:</strong> ${personaje.gender}</p>
            `;
            container.appendChild(tarjeta);
            tarjeta.addEventListener("mouseover",()=>{
                tarjeta.style.transform=("scale(1.05)");
                tarjeta.style.transition=("transform 0.3s ease")
            });
            tarjeta.addEventListener("mouseout",()=>{
                tarjeta.style.transform=("scale(1)");
            })
        });
    }
    
}
customElements.define('lista-personaje', ListaPersonajes);
