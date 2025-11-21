//Elementos del DOM
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

//Toast bootstrap
const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Modal bootstrap
const idModal = document.getElementById("idModal");

//Tabla
const divTablaPacientes = document.getElementById("idTablaPacientes");

let arrayPaciente = [];
let indexEdicion = -1; // -1 → Agregar | >= 0 → Editar

// Funciones
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    indexEdicion = -1;

    inputNombre.focus();
};

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
                ? "Femenino"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;


    if (nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != "") {

        if (indexEdicion === -1) {
            arrayPaciente.push(new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion));
            mensaje.innerHTML = "Se ha registrado un nuevo paciente.";
            imprimirPacientes()
        } else {
            arrayPaciente[indexEdicion] = new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion);
            mensaje.innerHTML = "Se ha actualizado el paciente.";
            imprimirPacientes()
        }
        toast.show();
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan datos por completar.";
        toast.show();
    }

}

const editarPaciente = (index) => {
    let paciente = arrayPaciente[index];

    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];

    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else {
        inputRdFemenino.checked = true;
    }

    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
            cmbPais.selectedIndex = i;
            break;
        }
    }

    inputDireccion.value = paciente[5];

    indexEdicion = index;
    mensaje.innerHTML = `Editando paciente #${parseInt(index) + 1}`;
    toast.show();
};

const eliminarPaciente = (index) => {
    let confirmar = confirm(`¿Estás seguro de eliminar a ${arrayPaciente[index][0]} ${arrayPaciente[index][1]}?`);
    if (confirmar) {
        arrayPaciente.splice(index, 1);
        imprimirPacientes();

        if (indexEdicion == index) {
            limpiarForm();
        }

        imprimirPacientes()
        mensaje.innerHTML = "Paciente eliminado.";
        toast.show();
    }
};

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        $fila += `<tr>
        <td scope="row" class="text-center fw-bold"> ${contador} </td> 
        <td> ${element[0]} </td>
        <td> ${element[1]} </td>
        <td> ${element[2]} </td>
        <td> ${element[3]} </td>
        <td> ${element[4]} </td>
        <td> ${element[5]} </td>
        <td> 
            <button type="button" class="btn-editar btn btn-primary" data-index="${contador - 1}" alt="Editar"> 
                <i class="bi bi-pencil-square"> </i> 
            </button> 
            <button type="button" class="btn-eliminar btn btn-danger" data-index="${contador - 1}" alt="Eliminar"> 
                <i class="bi bi-trash3-fill"> </i> 
            </button>   
        </td>
        </tr>
        `;
        contador++;
    });
    return $fila;
};

const imprimirPacientes = () => {
    if (arrayPaciente.length === 0) {
        document.getElementById("idTablaPacientes").innerHTML = "No hay pacientes registrados.";
        return;
    }

    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha de nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">País</th>
                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;
    document.getElementById("idTablaPacientes").innerHTML = $table;
};

let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        cmbPais.appendChild(option);
        mensaje.innerHTML = "Pais agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Eventos

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
}

buttonAgregarPaciente.onclick = () => {
    addPaciente();
}

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
}

buttonAgregarPais.onclick = () => {
    addPais();
}

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
})

divTablaPacientes.addEventListener("click", (event) => {
    const btnEditar = event.target.closest(".btn-editar");
    const btnEliminar = event.target.closest(".btn-eliminar");

    if (btnEditar) {
        const index = btnEditar.dataset.index;
        editarPaciente(index);
    }
    else if (btnEliminar) {
        const index = btnEliminar.dataset.index;
        eliminarPaciente(index);
    }
});

limpiarForm();