const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
/*document.querySelector nos regresa un arreglo de datos*/

// evento para cada boton para que se muestre en los filtros
const BtnTodos = document.querySelector('.todos'); // aqui va el nombre de la clase del boton
const BtnEnsaladas = document.querySelector('.ensaladas'); // aqui va el nombre de la clase del boton
const BtnBebidas = document.querySelector('.bebidas'); // aqui va el nombre de la clase del boton
//const BtnCaliente = document.querySelector('.caliente'); // aqui va el nombre de la clase del boton
const BtnPostres = document.querySelector('.postres'); // aqui va el nombre de la clase del boton
const ContenedorPlatillos= document.querySelector ('.platillos');


document.addEventListener('DOMContentLoaded',()=>{
// llamar funciones
eventos();
platillos();
});

const eventos = () =>{
menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
navegacion.classList.remove('ocultar');
botoncerrar();
}
const botoncerrar = ()=>{ /* para cerrar de la X*/
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    
    /* Si ya se clic[o una vez la pantalla y ya se limpi[o no volver a ejecutar la fucion de limpiar*/
    if(document.querySelectorAll('.pantalla-completa').leng>0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }

    console.log(btnCerrar);  
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);
}

//laisy Load> sirve para que las imagenes se carguen a medida vayamos bajando con el scroll
// de lo contrario se cargar [ian todas de un solo en la pgina y esta se pondria lenta
const observer = new IntersectionObserver((entries, observer)=>{
//entries es la informacin y obeserver el observador que ira viendo cuando hay una interseccion 
    entries.forEach(entry=>{
         if(entry.IsIntersecting){  // si hay una interseccion
            const imagen = entry.target; // informacion guardada
            observer.unobserve(imagen); // que no observe la imagen
        }
    });
});

imagenes.forEach(imagen=>{/* recorre la imagen*/ 
    imagen.src = imagen.dataset.src;
    observer.observe(imagen); // en la parte de arriba no muestra la imagen y aqui es para que la muetsre
});

const cerrarMenu =( boton,overlay)=>{
    boton.addEventListener('click',()=>{
     navegacion.classList.add('ocultar');  
     overlay.remove();
    });

overlay.onclick = function() {
    overlay.remove();
    navegacion.classList.add('ocultar');
    }
}

//filtro para seleccionar los platillos
const platillos = () => {
    let platillosArreglo = []; // arreglo vacio para almacenar cada platillo
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo => platillosArreglo = [...platillosArreglo, platillo]);
   
    //arreglo para gaurdar cada platillo
    const ensaladas =  platillosArreglo.filter( ensalada=> ensalada.getAttribute('data-platillo') === ' ensalada');
    const bebidas =  platillosArreglo.filter( bebida=> bebida.getAttribute('data-platillo') === ' bebida');
    const postres =  platillosArreglo.filter( postre=> postre.getAttribute('data-platillo') === ' postre');

     mostrarPlatillos (ensaladas, bebidas, postres, platillosArreglo); // llamar el arreglo de ensaladas

    
}// fin platillos

const mostrarPlatillos = (ensaladas, bebidas,postres, todos) => {
    BtnEnsaladas.addEventListener('click', ()=>{
    //  limpiarHtml(ContenedorPlatillos);
      ensaladas.forEach(ensalada=> ContenedorPlatillos.appendChild(ensalada));
    
    });

     BtnBebidas.addEventListener('click', ()=>{
      limpiarHtml(ContenedorPlatillos);
      bebidas.forEach(bebida => ContenedorPlatillos.appendChild(bebida));

    });

    BtnPostres.addEventListener('click', ()=>{
      limpiarHtml(ContenedorPlatillos);
      postres.forEach(postre => ContenedorPlatillos.appendChild(postre));
    });
    BtnTodos.addEventListener('click', ()=>{
      limpiarHtml(ContenedorPlatillos);
      todos.forEach(todos => ContenedorPlatillos.appendChild(todos));
    });
}


const limpiarHtml = (contenedor) =>{
    while (contenedor.firstchild){ // mientras haya contenido en el contenedor
            contenedor.removeChild(contenedor.firstchild); // limpiar la pagina 
    }
}