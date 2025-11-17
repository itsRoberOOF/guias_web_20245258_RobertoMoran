//Leyendo elementos del DOM

const containerEstudiantes = document.querySelector("#idContainerEstudiantes"); 

//Botones
const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");

//Inputs
const inputCarnet = document.querySelector("#inputCarnet")
const inputNombre = document.querySelector("#inputNombre")
const inputApellido = document.querySelector("#inputApellido")

//Arreglo
let arrayEstudiantes = [];

//Eventos
btnAddEstudiante.addEventListener("click", guardarEstudiante);

//Agregar estudiantes
function guardarEstudiante(){
    const nombres = inputNombre.value.trim().toString().toUpperCase();
    const apellidos = inputApellido.value.trim().toString().toUpperCase();
    const carnet = inputCarnet.value.trim().toString().toUpperCase();

    const errores = validarDatos(carnet, nombres, apellidos);
    if(errores.length > 0){
        errores[0] = "- " + errores[0];
        alert("Errores: \n" + errores.join("\n- "));
        return;
    }
    
    const alumnos = recuperarEstudiantes();
    alumnos.push({carnet, nombres, apellidos});

    guardarEstudiantes(alumnos);
    limpiarForm();

    alert("Estudiante registrado correctamente");
}

function recuperarEstudiantes(){
    const data = localStorage.getItem("estudiantes");
    return data ? JSON.parse(data) : [];
}

function guardarEstudiantes(estudiantes){
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function validarDatos(carnet, nombre, apellido){
    const errores = [];

    if(carnet.trim().length == 0){
        errores.push("El carnet es requerido");
    }
    if(nombre.trim().length == 0){
        errores.push("Los nombres son requeridos");
    }
    if(apellido.trim().length == 0){
        errores.push("Los apellidos son requeridos");
    }

    return errores;
}

function limpiarForm() {
    inputCarnet.value = "";
    inputNombre.value = "";
    inputApellido.value = "";
    inputCarnet.focus();
}

//Mostrar estudiantes

btnViewEstudiantes.addEventListener("click", verEstudiantes);

function verEstudiantes(){
    const arrayEstudiantes = recuperarEstudiantes();

    //Validando que existan estudiantes registrados
    let totalEstudiantes = arrayEstudiantes.length;
    if (totalEstudiantes > 0) {
        let carnet;
        let nombres;
        let apellidos;
        let table = "<table class='table table-light table-striped'>";
        table+= "<thead>";
        table+= "<tr>"
        table+= "<th scope='col' style='width: 5%'>#</th>";
        table+= "<th scope='col' style='width: 15%'>Carnet</th>";
        table+= "<th scope='col'>Nombres</th>";
        table+= "<th scope='col'>Apellidos</th>";
        table+= "</tr>";
        table+= "</thead>";
        table+= "<tbody>";

        //Bucle para llenar la tabla con los alumnos
        for (let i = 0; i < totalEstudiantes; i++) {
            carnet = arrayEstudiantes[i].carnet;
            nombres = arrayEstudiantes[i].nombres;
            apellidos = arrayEstudiantes[i].apellidos;

            table+= "<tr>";
            table+= `<td scope='row' style='font-weight: bold;'>${i + 1}</td>`;
            table+= `<td>${carnet}</td>`;
            table+= `<td>${nombres}</td>`;
            table+= `<td>${apellidos}</td>`;
            table+= "</tr>";
        }

        table+= "</tbody>";
        table+= "</table>";

        console.log(table);

        containerEstudiantes.innerHTML = table;
    }else{
        alert("No se han registrado estudiantes");
    }
}
        