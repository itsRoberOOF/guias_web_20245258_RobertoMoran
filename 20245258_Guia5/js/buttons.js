function aviso(){
    alert("¡Bienvenido al mundo JavaScript!");
}

function confirmacion(){
    //Los valores que puede almacenar la variable confirmacion son true o false
    let confirmacion = confirm("¿Desea salir de la sesión?");
    /*
        Para imprimir una variable en una cadena podemos usar ´
        y luego llamar a la variable con ${nombreVariable}
    */ 
   alert(`Valor seleccionado ${confirmacion}`);
}

function capturarDatos(){
    let nombre = prompt("¿Cual es su nombre?");
    // 0 es el valor default
    let edad = prompt("¿Cual es su edad?", 0);
    alert(`Su nombre es ${nombre} y su edad ${edad}`);
}

function dibujarParrafo(){
    let parrafo = prompt("Escriba la información que desea visualizar en el párrafo");

    // Utilizaremos la API DOM para acceder al elemento <p id="idParrafo">
    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}