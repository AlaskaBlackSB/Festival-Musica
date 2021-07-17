document.addEventListener('DOMContentLoaded', function (e) {
    scrollNav();
    navegacionFija();
});

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    //Se asigna el evento clic a cada enlace
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            console.log(e.target.attributes.href.value);
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior: 'smooth'  //Scroll suave
            });
        });
    });
    console.log(enlaces);
}

function navegacionFija() {
    const header = document.querySelector('.header');

    //Registrar el Intersection Observer
    const observer = new IntersectionObserver( function (entries) {
        if (entries[0].isIntersecting) {
            header.classList.remove('fijo');
        }else{
            header.classList.add('fijo');
        }
    });
    //Elemento a observar
    observer.observe(document.querySelector('.sobre-festival'));
}