class tarjeta extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    //el conectedCallback lo que hace es ejecutar de una todo el contenido que este en este
    connectedCallback() {
        console.log('Tarjeta component added to the DOM');

        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .tarjeta {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 16px;
                    background-color: #f9f9f9;
                }
                .tarjeta h2 {
                    margin: 0 0 8px;
                }
            </style>
            <div class="tarjeta">
               
                <p>adios</p>
            </div>
        `;
    }
       
}
customElements.define('etiqueta-personalizada', tarjeta);