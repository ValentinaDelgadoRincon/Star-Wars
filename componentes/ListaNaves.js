class ListaNaves extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }
    connectedCallback(){
        this.cargarNaves()
    }
    async cargarNaves(){
        try{
            const respuesta=await fetch('https://swapi.dev/api/vehicles/');
            const datos = await respuesta.json();
            this.render(datos.results);
        }catch (error){
            this.renderError();
            console.error('Error cargando naves',error);
        }
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
        grid-template-columns:1fr 1fr;
        gap:16px;
        padding:0;
        padding:5vh;
        width:50%;
        }
        .nave-tarjeta{
            text-align:center;
            background-color: #3e565994;
            border:1px solid #ccc;
            color:yellow;
            line-height: 1rem;
        }
        border-radius:8px;
        padding:16px;
        box-shadow:2px 2px 6px black;
        font-family:Arial;
        .tarjetas h3{
        font-size:20px
        color:yellow;
    }
    .nave-tarjeta p{
    margin: 4px 0;
    font-size:14px;
    color: white;
    
    }
        </style>
        <div class="contenedor">
            <div class="nave-espa-tarjeta" id="naves-container"></div>
            <div class="imagen-nave">
                <img src="multimedia/serie-6.png"/>
            </div>
        </div>
    `
        const container=this.shadowRoot.querySelector('#naves-container')
        naves.forEach(nave => {
            const tarjetas = document.createElement('div');
            tarjetas.classList.add('nave-tarjeta');
            tarjetas.innerHTML=`
            <h3>${nave.name}</h3>
            <p>${nave.model}</p>
            <p>${nave.manufacturer}<p/>
            <p>${nave.passengers}</p>
            `;
            container.appendChild(tarjetas);
        })
    }
};
customElements.define('lista-naves', ListaNaves);
