// Elementos del DOM
const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombre = document.getElementById("idTxtNombre");
const inputDui = document.getElementById("idTxtDui");
const inputNit = document.getElementById("idTxtNit");
const inputFecha = document.getElementById("idTxtFecha");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputEdad = document.getElementById("idTxtEdad");

const buttonAgregar = document.getElementById("idBtnAgregar");
const buttonLimpiar = document.getElementById("idBtnLimpiar");
const buttonMostrar = document.getElementById("idBtnMostrar");

const divTablaEstudiantes = document.getElementById("idTablaEstudiantes");

// Notificaciones
const notificacion = document.getElementById("idNotificacion");
const mensaje = document.getElementById("idMensaje");
const toastBootstrap = new bootstrap.Toast(notificacion);

// Variables
let arrayEstudiantes = [];
let indexEdicion = -1; // -1 significa modo "Nuevo", >= 0 significa modo "Edición"

// Expresiones regulares para validación
const regex = {
    // Carnet → 2 letras seguidas de 3 números
    carnet: /^[A-Z]{2}\d{3}$/,

    // Nombre → Letras, espacios y acentos
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,

    // DUI → Formato ########-# (solo números)
    dui: /^\d{8}-\d{1}$/,

    // NIT → Formato ####-######-###-# (solo números)
    nit: /^\d{4}-\d{6}-\d{3}-\d{1}$/,

    // Fecha → Formato dd/mm/aaaa
    fecha: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,

    // Formato de correo estándar
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Solo números positivos
    edad: /^\d+$/
};

//Funciones
const mostrarNotificacion = (texto, claseColor) => {
    mensaje.innerHTML = texto;
    notificacion.className = `toast ${claseColor}`;
    toastBootstrap.show();
};

const limpiarFormulario = () => {
    inputCarnet.value = "";
    inputNombre.value = "";
    inputDui.value = "";
    inputNit.value = "";
    inputFecha.value = "";
    inputCorreo.value = "";
    inputEdad.value = "";

    indexEdicion = -1;

    buttonAgregar.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar datos';
    buttonAgregar.classList.remove("btn-info");
    buttonAgregar.classList.add("btn-success");

    inputCarnet.focus();
};

//Validaciones + notificaciones de error
const validarCampos = () => {
    // Carnet
    if (!regex.carnet.test(inputCarnet.value.trim())) {
        mostrarNotificacion("Error: Carnet inválido. Formato requerido: 2 letras seguidas de 3 números (Ej: AB001)", "text-bg-danger");
        inputCarnet.focus();
        return false;
    }
    // Nombre
    if (!regex.nombre.test(inputNombre.value.trim())) {
        mostrarNotificacion("Error: Nombre inválido. Solo letras y espacios", "text-bg-danger");
        inputNombre.focus();
        return false;
    }
    // DUI
    if (!regex.dui.test(inputDui.value.trim())) {
        mostrarNotificacion("Error: DUI inválido. Formato: ########-# (solo números)", "text-bg-danger");
        inputDui.focus();
        return false;
    }
    // NIT
    if (!regex.nit.test(inputNit.value.trim())) {
        mostrarNotificacion("Error: NIT inválido. Formato: ####-######-###-# (solo números)", "text-bg-danger");
        inputNit.focus();
        return false;
    }
    // Fecha
    // Validación 1 → Si no selecciona fecha
    if (!regex.fecha.test(inputFecha.value.trim())) {
        mostrarNotificacion("Error: Debe seleccionar una fecha válida", "text-bg-danger");
        inputFecha.focus();
        return false;
    }
    // Validación 2 → Formato
    if (!regex.fecha.test(inputFecha.value.trim())) {
        mostrarNotificacion("Error: Fecha inválida. Formato: dd/mm/aaaa", "text-bg-danger");
        inputFecha.focus();
        return false;
    }
    // Correo
    if (!regex.correo.test(inputCorreo.value.trim())) {
        mostrarNotificacion("Error: Correo electrónico inválido", "text-bg-danger");
        inputCorreo.focus();
        return false;
    }
    // Edad
    if (!regex.edad.test(inputEdad.value.trim())) {
        mostrarNotificacion("Error: La edad debe ser un número", "text-bg-danger");
        inputEdad.focus();
        return false;
    }

    return true;
};

// Funciones de CRUD

const guardarEstudiante = () => {
    if (!validarCampos()) return;

    const estudiante = {
        carnet: inputCarnet.value.trim(),
        nombre: inputNombre.value.trim(),
        dui: inputDui.value.trim(),
        nit: inputNit.value.trim(),
        fecha: inputFecha.value.trim(),
        correo: inputCorreo.value.trim(),
        edad: inputEdad.value.trim()
    };

    if (indexEdicion === -1) {
        arrayEstudiantes.push(estudiante);
        mostrarNotificacion("Estudiante registrado", "text-bg-success");
        imprimirEstudiantes();
    } else {
        arrayEstudiantes[indexEdicion] = estudiante;
        mostrarNotificacion("Estudiante actualizado", "text-bg-primary");
        imprimirEstudiantes();
    }

    limpiarFormulario();
};

const editarEstudiante = (index) => {
    const est = arrayEstudiantes[index];

    inputCarnet.value = est.carnet;
    inputNombre.value = est.nombre;
    inputDui.value = est.dui;
    inputNit.value = est.nit;
    inputFecha.value = est.fecha;
    inputCorreo.value = est.correo;
    inputEdad.value = est.edad;

    indexEdicion = index;

    //Cambiar boton
    buttonAgregar.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar datos';
    buttonAgregar.classList.remove("btn-success");
    buttonAgregar.classList.add("btn-info");

    mostrarNotificacion(`Editando a: ${est.nombre}`, "text-bg-info");
};

const eliminarEstudiante = (index) => {
    const nombre = arrayEstudiantes[index].nombre;
    const confirmar = confirm(`¿Estás seguro de eliminar a ${nombre}?`);

    if (confirmar) {
        arrayEstudiantes.splice(index, 1);

        imprimirEstudiantes();

        if (indexEdicion == index) {
            limpiarFormulario();
        }

        mostrarNotificacion("Estudiante eliminado", "text-bg-danger");
    }
};

const imprimirFilas = () => {
    let filasHTML = "";
    arrayEstudiantes.forEach((est, index) => {
        filasHTML += `<tr>
            <td class="text-center fw-bold">${index + 1}</td>
            <td>${est.carnet}</td>
            <td>${est.nombre}</td>
            <td>${est.dui}</td>
            <td>${est.nit}</td>
            <td>${est.fecha}</td>
            <td>${est.correo}</td>
            <td>${est.edad}</td>
            <td class="text-center">
                <button type="button" class="btn btn-primary btn-sm btn-editar" data-index="${index}">
                    <i class="bi bi-pencil-square pointer-events-none"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">
                    <i class="bi bi-trash3-fill pointer-events-none"></i>
                </button>
            </td>
        </tr>`;
    });
    return filasHTML;
};

const imprimirEstudiantes = () => {
    if (arrayEstudiantes.length === 0) {
        divTablaEstudiantes.innerHTML = `<div class="alert alert-dark text-center">
            No hay estudiantes registrados.
        </div>`;
        return;
    }

    const tablaHTML = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered align-middle">
            <thead class="table-dark">
                <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col">Carnet</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">DUI</th>
                    <th scope="col">NIT</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Edad</th>
                    <th scope="col" class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${imprimirFilas()}
            </tbody>
        </table>
    </div>`;

    divTablaEstudiantes.innerHTML = tablaHTML;
};

// Eventos

buttonAgregar.addEventListener("click", guardarEstudiante);
buttonLimpiar.addEventListener("click", limpiarFormulario);
buttonMostrar.addEventListener("click", imprimirEstudiantes);

divTablaEstudiantes.addEventListener("click", (e) => {
    const btnEditar = e.target.closest(".btn-editar");
    const btnEliminar = e.target.closest(".btn-eliminar");

    if (btnEditar) {
        const index = btnEditar.dataset.index;
        editarEstudiante(index);
    } else if (btnEliminar) {
        const index = btnEliminar.dataset.index;
        eliminarEstudiante(index);
    }
});

//Asegurar mayusculas
inputCarnet.addEventListener("blur", () => {
    inputCarnet.value = inputCarnet.value.toUpperCase();
});

limpiarFormulario();