
class ListaPlanetas extends HTMLElement{ 
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    } 
    connectedCallback(){
        this.cargarPlanetas()
    }
    async cargarPlanetas(){
        try{
            const respuesta=await fetch('https://swapi.py4e.com/api/planets/');
            const datos = await respuesta.json();
            this.render(datos.results); 
        }catch (error){
            this.renderError();
            console.error('Error cargando planetas', error);
        }
        }
        renderError() {
        this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar los planetas</p>`;
    }
    render(planetas){
        this.shadowRoot.innerHTML=`
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
        grid-template-columns:1fr 1fr;
        gap:16px;
        padding:0;
        padding:5vh;
        width:50%;
        }
        .planeta-tarjeta{
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
    .planeta-tarjeta p{
    margin: 4px 0;
    font-size:14px;
    color: white;
    .imagen-planeta
    }
    }
        </style>
        <div class="contenedor">
            <div class="planeta-espa-tarjeta" id="planets-container"></div>
            <div class="imagen-planeta">
                <img src="multimedia/serie-5.png>
            </div>
        </div>
    `
    const container=this.shadowRoot.querySelector('#planets-container')
    planetas.forEach(planeta => {
        const tarjetas = document.createElement('div');
        tarjetas.classList.add('planeta-tarjeta');
        tarjetas.innerHTML=`
        <h3>${planeta.name}</h3>
        <p>${planeta.climate}</p>
        <p>${planeta.gravity}</p>
        <p>${planeta.terrain}</p>
        `;
        container.appendChild(tarjetas);
    })
    }
};
customElements.define('lista-planetas', ListaPlanetas);