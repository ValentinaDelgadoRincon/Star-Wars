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
