document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.querySelector("barra-buscador");
    const lista = document.querySelector("lista-personaje");

    buscador.addEventListener("busqueda", (evento) => {
        const termino = evento.detail;

        lista.dispatchEvent(new CustomEvent("busqueda", {
            detail: termino
        }));
    });
});
