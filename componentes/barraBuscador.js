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

class barraBuscador extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.innerHTML = `
        <input type="text" placeholder="Buscar" />
        <style>
          input {
            display:flex;
            padding: 10px;
            font-size: 16px;
            width: 100%;
            max-width: 70%;
            margin-bottom: 20px;
            font-size: 1.7rem;
            color:black;
            justify-content: center;
            display: flex;
            height: 30%;
            margin-top: 8vh;
            margin-left: 15%;
            align-items: center;
            background-color: #3e565994;
            border-radius: 10px;
          }
        </style>
      `;
    }

    connectedCallback(){
        const input = this.shadowRoot.querySelector("input");
        input.addEventListener ("input", () => {
            console.log(input.value);
            
            const eventoContenido = new CustomEvent("busqueda", {
                detail:input.value.toLowerCase(),
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(eventoContenido);
        })
    }
}
customElements.define("barra-buscador", barraBuscador);


