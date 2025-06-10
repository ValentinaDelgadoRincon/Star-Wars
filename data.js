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
    h2{
    font-family:Arial;
    }
    .grid{
    display:grid;
    grid-template-comlumns:repeat(auto-fill,minmax(200px, 1fr));
    gap:16px;
    padding:0;
    }
    .tarjetas{
    background:#ffffff;
    border:1px solid #ccc;
    }
    border-radius:8px;
    padding:16px;
    box-shadow:2px 2px 6px black;
    font-family:Arial;
    }
    .tarjetas h3{
    margin-top:0;
    font-size:18px;
    color:#333;
    }
    .tarjetas p{
    margin: 4px 0;
    font-size:14px;
    }
    </style>
    <h2>Personajes de Star Wars</h2>
    <div class="grid" id="user-container"></div>
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