class tarjetaLaura extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    connectedCallback(){
        console.log("Tarjeta Laura component")
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML=`
        <style>
            .tarjetaLaura{
                border:1px solid blue;
                border-radius:10px;
                padding:16px;
                background-color:pinck;
                width:50%;
                .tarjetaLaura h2{
                    margin:0 0 8px;
                    text-align:center;}
                </style>
            <div class="tarjetaLaura">
                <p>Hola :)</p>
                </div>`;
    }
}
customElements.define("etiqueta-laura",tarjetaLaura);