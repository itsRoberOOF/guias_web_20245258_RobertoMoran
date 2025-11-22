const primerColorFondo = function (event) {
    document.body.style.backgroundColor = event.target.value;
};

const cambiarColorFondo = function (color) {
    document.body.style.backgroundColor = color;
};

// Funciones para cambiar color de titulos
const primerColorTitulos = function (event) {
    let colorSeleccionado = event.target.value;
    const titulos = document.querySelectorAll("h1");
    for (let index = 0; index < titulos.length; index++) {
        titulos[index].style.color = colorSeleccionado;
    }
};

const cambiarColorTitulos = function (colorSeleccionado) {
    const titulos = document.querySelectorAll("h1");
    for (let index = 0; index < titulos.length; index++) {
        titulos[index].style.color = colorSeleccionado;
    }
};

// Funciones para cambiar color de parrafos
const primerColorParrafos = function (event) {
    let colorSeleccionado = event.target.value;
    const parrafos = document.querySelectorAll("p");
    for (let index = 0; index < parrafos.length; index++) {
        parrafos[index].style.color = colorSeleccionado;
    }
};

const cambiarColorParrafos = function (colorSeleccionado) {
    const parrafos = document.querySelectorAll("p");
    for (let index = 0; index < parrafos.length; index++) {
        parrafos[index].style.color = colorSeleccionado;
    }
};

// Funciones para manipular tamaño de letra
let contadorAumentar = 1;
const aumentarLetra = function () {
    contadorAumentar += 0.005;
    document.body.style.fontSize = `${contadorAumentar}em`;
    const parrafos = document.querySelectorAll("p");
    for (let index = 0; index < parrafos.length; index++) {
        parrafos[index].style.fontSize = `${contadorAumentar}em`;
    }
    const titulos = document.querySelectorAll("h1");
    for (let index = 0; index < titulos.length; index++) {
        titulos[index].style.fontSize = `${contadorAumentar}em`;
    }
};

let contadorDisminuir = 1;
const disminuirLetra = function () {
    contadorDisminuir -= 0.005;
    document.body.style.fontSize = `${contadorDisminuir}em`;
    const parrafos = document.querySelectorAll("p");
    for (let index = 0; index < parrafos.length; index++) {
        parrafos[index].style.fontSize = `${contadorDisminuir}em`;
    }
    const titulos = document.querySelectorAll("h1");
    for (let index = 0; index < titulos.length; index++) {
        titulos[index].style.fontSize = `${contadorDisminuir}em`;
    }
};

// Funcion principal
const startDOM = () => {
    const buttonFondo = document.getElementById("idFondo");
    buttonFondo.value = "#ffffff";
    buttonFondo.addEventListener("input", primerColorFondo, false);
    buttonFondo.addEventListener("change", cambiarColorFondo, false);
    buttonFondo.select();

    const buttonTitulos = document.getElementById("idTitulos");
    buttonTitulos.value = "#000000";
    buttonTitulos.addEventListener("input", primerColorTitulos, false);
    buttonTitulos.addEventListener("change", cambiarColorTitulos, false);
    buttonTitulos.select();

    const buttonParrafos = document.getElementById("idParrafos");
    buttonParrafos.value = "#000000";
    buttonParrafos.addEventListener("input", primerColorParrafos, false);
    buttonParrafos.addEventListener("change", cambiarColorParrafos, false);
    buttonParrafos.select();

    const buttonAumentar = document.getElementById("idBtnAumentar");
    const buttonDisminuir = document.getElementById("idBtnDisminuir");

    buttonAumentar.addEventListener("click", aumentarLetra, false);
    buttonDisminuir.addEventListener("click", disminuirLetra, false);

};

//Activar funcion principal al cargar el DOM
document.addEventListener("DOMContentLoaded", startDOM);