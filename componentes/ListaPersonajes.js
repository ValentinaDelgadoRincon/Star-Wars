class ListaPersonajes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set personajes(data) {
        this.shadowRoot.innerHTML = `
        <div>        
            <h3>${data.name}</h3>
            <p><strong>Altura:</strong>${data.height} cm</p>
            <p><strong>Genero:</strong>${data.gender} </p>
        </div>
        <style>
            div {
                border: 1px solid #ccc;
                padding: 10px;
                margin: 10px;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            h3 {
                color: #333;
            }
            p {
                margin: 5px 0;
            }
            strong {
                color: #555;
            }
        </style>
     
    `;
        const container = this.shadowRoot.querySelector('#user-container');
        users.forEach(user => {
            const tarjetas = document.createElement('div');
            tarjetas.classList.add('tarjetas');
            tarjetas.innerHTML = `
        
        `;
            container.appendChild(tarjetas);
        });
    }

}

customElements.define('lista-personaje', ListaPersonajes);




connectedCallback() {
    this.cargarUsuarios()
}


async cargarUsuarios() {
    try {
        const respuesta = await fetch('https://swapi.py4e.com/api/people/');
        const datos = await respuesta.json();

        this.render(datos.results);
    } catch (error) {
        this.renderError();
        console.error('Error cargando personajes', error);
    }
}

renderError() {
    this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar los personajes</p>`;
}

