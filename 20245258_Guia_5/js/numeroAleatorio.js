//Generando un número aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;

console.log(numeroAleatorio)

//Crear una constante que permita identificar el máximo de intentos
const numeroIntentos = 3;

//Guardar el número de intentos que realiza el usuario
let intentos = 1;

function generarNumeroAleatorio() {
    //Variable para impresión de mensajes
    let mensaje;

    //Utilizar el DOM para acceder al parrafo
    const parrafo = document.querySelector("#idParrafo");

    //Verificar en que intento está el usuario
    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );

        //Verificar el numero aleatorio con el ingresado por el usuario
        if (numero == numeroAleatorio) {
            mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        } else {
            pista = numero > numeroAleatorio ? "mayor" : "menor";

            mensaje = `Vuelve a intentar. Te quedan ${
                numeroIntentos - intentos
            } intentos. <strong>Pista:</strong> El número que ingresaste (${numero}) es ${pista} al número oculto.`;
        }

        //Aumentar el valor de los intentos
        intentos++;
    } else {
        mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    //Imprimimos el mensaje en el parrafo
    parrafo.innerHTML = mensaje;
}
