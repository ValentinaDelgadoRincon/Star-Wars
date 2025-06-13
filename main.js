document.addEventListener("DOMContentLoaded", () => {
    const buscadores = document.querySelectorAll("barra-buscador");
    const listaPersonajes = document.querySelector("lista-personaje");
    const listaPlanetas = document.querySelector("lista-planetas");
    const listaNaves = document.querySelector("lista-naves");
    const listaSeries = document.querySelector("lista-series");

    buscadores.forEach(buscador => {
        buscador.addEventListener("busqueda", (evento) => {
            const termino = evento.detail;
            console.log('Dato recibido desde el main', termino);

            listaPersonajes?.dispatchEvent(new CustomEvent("busqueda", {
                detail: termino
            }));

            listaPlanetas?.dispatchEvent(new CustomEvent("busqueda", {
                detail: termino
            }));
            listaNaves?.dispatchEvent(new CustomEvent("busqueda", {
                detail: termino
            }));

            listaSeries?.dispatchEvent(new CustomEvent("busqueda", {
                detail: termino
            }));

            
        });
    });
});
