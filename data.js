async function obtenerDatos () {
    const url = "https://swapi.py4e.com/api/people/"
    const metodo = {
        method: "GET",
    }
    try {
        const respuesta = await fetch(url,metodo);
        console.log(respuesta);
        const datos = await respuesta.json();
    console.log(datos);
        
    }catch (error) {
        console.error("Error al obtener los datos:", error);
    }


}

obtenerDatos(); 