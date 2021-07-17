document.addEventListener('DOMContentLoaded', function () {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    console.log(galeria);

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.alt = 'imagen galeria';
        imagen.dataset.imagenId = i.toString();
        imagen.onclick = mostarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);
        
        galeria.appendChild(lista);
    }
}

function mostarImagen(e) {
    const id = parseInt(e.target.dataset.imagenId);
    const imagen = document.createElement('IMG');
    const cerrarImagen = document.createElement('P');
    const overlay = document.createElement('DIV');
    const body = document.querySelector('body');

    //Creacion de la imagen
    imagen.src = `build/img/grande/${id}.webp`;

    //Creacion del boton para cerrar la imagen
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    cerrarImagen.onclick = function () {    //Cierra la imagen al dar clic en la X
      overlay.remove();
      body.classList.remove('fijar-body');
    };

    //Creacion del overlay que contendrá la imagen a mostrar
    overlay.classList.add('overlay');
    overlay.onclick = function () { //Cierra la imagen al dar clic en cualquier lado
        overlay.remove();
        body.classList.remove('fijar-body');
    };
    overlay.appendChild(imagen);
    overlay.appendChild(cerrarImagen);
    
    //Se agrega el overlay al div
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}