


/////////////////////////////VARIABLES////////////////////////////////////
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const year = document.querySelector('#year');


//Variable todos los select
const allSelect = [marca, minimo, maximo, puertas, transmision, color, year];

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');


//Esta es una variable que da el año actual, a partir de hai podemos ir jugando
const max = new Date().getFullYear(); 
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    puertas: '',
    transmision: '',
    color: '',
    
}



/////////////////////////////EVENTOS////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    // lLena las opciones de años
    llenarSelect();   
})

marca.addEventListener('change', e => {           
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', e => {           
    datosBusqueda.year = parseInt(e.target.value); //Lo pasamos a number porque venia en string
    filtrarAuto();

})

minimo.addEventListener('change', e => {           
    datosBusqueda.minimo = e.target.value; 
    filtrarAuto();

})

maximo.addEventListener('change', e => {           
    datosBusqueda.maximo = e.target.value; 
    filtrarAuto();
})


puertas.addEventListener('change', e => {           
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', e => {           
    datosBusqueda.transmision = e.target.value; 
    filtrarAuto();
})

color.addEventListener('change', e => {           
    datosBusqueda.color = e.target.value; 
    filtrarAuto();
    
})




/////////////////////////////FUNCIONES////////////////////////////////////
function mostrarAutos(autos) {

    limpiarHTML();

    autos.forEach(auto => {

        // ELIMINA EL HTML PREVIO

        //Hacemos un Object destructurion para crear objetos con esas keys y valosres del array
        const { marca, modelo, year, puertas, transmision, precio, color } = auto; 

        //Creamos una constante con el html creado en este caos un parrafo
        const autoHTML = document.createElement('p');

        //Creamos el texto de nuestro parrafo
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} PUERTAS - TRANSMISION:${transmision} - PRECIO:${precio} - COLOR:${color}    
        
        `
    
    // insertar en el html en #resultaod
        resultado.appendChild(autoHTML);
    });
}

//Limpiar HTM
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {

    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion) //Esto agrega los diferentes años al HTML
    }
}


//Funcion que filtra en base a la busqueda
//Funcion de alto nivel porque es una funcion que itera sobre otra funcion
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    console.log(resultado);
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
    

}


//CREAREMOS UNA FUNCION PARA CUANDO NO HAY RESULTADOS QUE CONCUERDEN CON LOS FILTROS APAREZCA UN MENSAJE, SI NOS FIJAMOS LOS RESULTADOS SON UN ARRAY, SI NINGUNO DE LOS FILTROS CONCUERDA, NOS ARROJA UN ARRAY VACIO, ENTONCES PODEMOS DECIRLE A LA MAQUINA QUE MUESTRE UN MENSAJE SI VE UN ARRAY VACIO
function noResultado() {

    //ELIMINA EL HTML PREVIO
    limpiarHTML();

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent= 'NO HAY RESULTADOS, INTENTA CON OTROS FILTROS';
    resultado.appendChild(noResultado);
    console.log(noResultado);

}


function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}
