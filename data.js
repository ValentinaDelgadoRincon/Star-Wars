class ListaPersonajes extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback(){
        this.cargarUsuarios()
    }


    async cargarUsuarios(){
        try{
            const respuesta = await fetch('https://swapi.py4e.com/api/people/');
            const datos = await respuesta.json();
            
            this.render(datos.results);
        }catch(error){
            this.renderError();
            console.error('Error cargando personajes',error);
        }
    }

renderError(){
    this.shadowRoot.innerHTML=`<p style="color:red;">Error al cargar los personajes</p>`;
}


render(users){
    this.shadowRoot.innerHTML=`
    <style>

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
    </style>
    <div class="espacio-tarjeta" id="user-container"></div>
    `;
    const container=this.shadowRoot.querySelector('#user-container');
    users.forEach(user =>{
        const tarjetas=document.createElement('div');
        tarjetas.classList.add('tarjetas');
        tarjetas.innerHTML=`
        <h3>${user.name}</h3>
        <p><strong>Altura:</strong>${user.height} cm</p>
        <p><strong>Genero:</strong>${user.gender} </p>
        `;
        container.appendChild(tarjetas);
    });
}
}
customElements.define('lista-personaje', ListaPersonajes); 

document.addEventListener("DOMContentLoaded", () => {
    const enlaces = document.querySelectorAll(".navbar a");
    const secciones = document.querySelectorAll(".seccion");
  
    
    secciones.forEach((sec, i) => {
      if (i === 0) sec.classList.add("active");
    });
  
    enlaces.forEach(enlace => {
      enlace.addEventListener("click", e => {
        e.preventDefault();
        const targetId = enlace.getAttribute("href").substring(1); 
        const targetSection = document.getElementById(targetId);
  
        if (!targetSection) return;
  
        secciones.forEach(sec => sec.classList.remove("active"));
  
        targetSection.classList.add("active");
  
        targetSection.scrollIntoView({ behavior: "smooth" });
      });
    });
  });
  
  
