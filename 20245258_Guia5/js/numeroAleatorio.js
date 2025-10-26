//Generando un número aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;

//Crear una constante que permita identificar el máximo de intentos
const numeroIntentos = 3;

//Guardar el número de intentos que realiza el usuario
let intentos = 1;

function generarNumeroAleatorio(){
    //Variable para impresión de mensajes
    let mensaje;

    //Utilizar el DOM para acceder al parrafo
    const parrafo = document.querySelector("#idParrafo");

    //Verificar en que intento está el usuario
    if (intentos <= numeroIntentos){
        let numero = prompt("¿Qué número se ha generado (Intento " + intentos + ")?");
    }
}