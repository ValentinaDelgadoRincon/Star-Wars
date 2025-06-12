class SearchBar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <input type="text" placeholder="Buscar por nombre..." />
        <style>
          input {
            padding: 8px;
            font-size: 16px;
            width: 100%;
            max-width: 300px;
            margin-bottom: 20px;
          }
        </style>
      `;
    }




    
    connectedCallback() {
      const input = this.shadowRoot.querySelector("input");
      input.addEventListener("input", () => {    
            
        const eventoContenidoSearchBar = new CustomEvent("busqueda", {
          detail: input.value.toLowerCase(),
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(eventoContenidoSearchBar);
      });
    }
  }

  customElements.define("search-bar", SearchBar);

