class tarjetaValentina extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {
        console.log('Tarjeta valentina added');

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
   <style>
   .tarjetaValentina {
   border: 5px solid green;
   border-radius: 10px;
   padding: 20px;
   margin: 18px;
   background-color:pink;
   }

   .tarjetaValentina h2 {
   margin: 0 0 10px;
   }
   </style>
   <div class="tarjetaValentina">

    <p>gud bai</p>
    </div>
    `;
    }

}
customElements.define('ejemplo-practica', tarjetaValentina);