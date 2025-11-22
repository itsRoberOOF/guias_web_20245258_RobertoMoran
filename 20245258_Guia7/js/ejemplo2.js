const formulario = document.forms["frmRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"));
const bodyModal = document.getElementById("idBodyModal");
const btnEnviar = formulario.elements["btnRegistro"];

const validarFormulario = () => {
    const nombre = document.getElementById("idNombre");
    const apellido = document.getElementById("idApellidos");
    const fechaNac = document.getElementById("idFechaNac");
    const correo = document.getElementById("idCorreo");
    const password = document.getElementById("idPassword");
    const passwordRep = document.getElementById("idPasswordRepetir");
    const pais = document.getElementById("idCmPais");
    const archivo = document.getElementById("idArchivo");

    const chkProg = document.getElementById("idCkProgramacion");
    const chkBD = document.getElementById("idCkBD");
    const chkIA = document.getElementById("idCkRedes");
    const chkSeg = document.getElementById("idCkSeguridad");

    const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked');

    let errores = [];
    let datosTabla = [];

    if (nombre.value.trim() === "") errores.push("El campo 'Nombres' es obligatorio.");
    if (apellido.value.trim() === "") errores.push("El campo 'Apellidos' es obligatorio.");

    if (!fechaNac.value) {
        errores.push("Debe seleccionar una fecha de nacimiento.");
    } else {
        const [anio, mes, dia] = fechaNac.value.split('-');
        const fechaInput = new Date(anio, mes - 1, dia);

        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        if (fechaInput > fechaActual) {
            errores.push("La fecha de nacimiento no puede ser una fecha futura.");
        }
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(correo.value.trim())) {
        errores.push("El formato del correo electrónico no es válido.");
    }

    if (password.value === "") {
        errores.push("Debe ingresar una contraseña.");
    } else if (password.value !== passwordRep.value) {
        errores.push("Las contraseñas no coinciden.");
    }

    let intereses = [];
    if (chkProg.checked) intereses.push("Programación");
    if (chkBD.checked) intereses.push("Base de Datos");
    if (chkIA.checked) intereses.push("Inteligencia Artificial");
    if (chkSeg.checked) intereses.push("Seguridad Informática");

    if (intereses.length === 0) {
        errores.push("Debe seleccionar al menos un interés.");
    }

    let carreraTexto = "";
    if (!carreraSeleccionada) {
        errores.push("Debe seleccionar una carrera.");
    } else {
        const idRadio = carreraSeleccionada.id;
        const labelCarrera = document.querySelector(`label[for="${idRadio}"]`);
        carreraTexto = labelCarrera.textContent;
    }

    if (pais.value === "Seleccione una opcion" || pais.selectedIndex === 0) {
        errores.push("Debe seleccionar un país de origen.");
    }

    if (errores.length > 0) {
        alert("Errores encontrados:\n\n- " + errores.join("\n- "));
    } else {
        datosTabla = [
            { campo: "Nombres", valor: nombre.value },
            { campo: "Apellidos", valor: apellido.value },
            { campo: "Fecha Nacimiento", valor: fechaNac.value },
            { campo: "Correo", valor: correo.value },
            { campo: "Carrera", valor: carreraTexto },
            { campo: "País", valor: pais.options[pais.selectedIndex].text },
            { campo: "Intereses", valor: intereses.join(", ") },
            { campo: "Avatar", valor: archivo.value ? archivo.files[0].name : "Sin archivo" }
        ];
        crearTablaEnModal(datosTabla);
    }
};

const crearTablaEnModal = (datos) => {
    //Reiniciar
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    const tituloTabla = document.createElement("h5");
    tituloTabla.textContent = "Datos del formulario";
    tituloTabla.className = "text-dark fw-bold mb-3";
    bodyModal.appendChild(tituloTabla);

    const table = document.createElement("table");
    table.setAttribute("class", "table table-striped table-bordered");

    const thead = document.createElement("thead");
    thead.setAttribute("class", "table-dark");
    const trHead = document.createElement("tr");

    const thCampo = document.createElement("th");
    thCampo.appendChild(document.createTextNode("Campo"));
    const thValor = document.createElement("th");
    thValor.appendChild(document.createTextNode("Valor capturado"));

    trHead.appendChild(thCampo);
    trHead.appendChild(thValor);
    thead.appendChild(trHead);

    const tbody = document.createElement("tbody");

    datos.forEach(dato => {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const b = document.createElement("b");

        b.appendChild(document.createTextNode(dato.campo));
        tdNombre.appendChild(b);

        const tdInfo = document.createElement("td");
        tdInfo.appendChild(document.createTextNode(dato.valor));

        tr.appendChild(tdNombre);
        tr.appendChild(tdInfo);
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    bodyModal.appendChild(table);

    const hr = document.createElement("hr");
    bodyModal.appendChild(hr);

    const tituloStats = document.createElement("h5");
    tituloStats.textContent = "Estadísticas del formulario";
    tituloStats.className = "text-dark fw-bold mb-3";
    bodyModal.appendChild(tituloStats);

    // Mostrar estadísticas de elementos del form
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        let elemento = elementos[index];
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        if (tipoElemento == "text" && tipoNode == "INPUT") {
            totText++;
        } else if (tipoElemento == "password" && tipoNode == "INPUT") {
            totPass++;
        } else if (tipoElemento == "email" && tipoNode == "INPUT") {
            totEmail++;
        } else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            totRadio++;
        } else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            totCheck++;
        } else if (tipoElemento == "file" && tipoNode == "INPUT") {
            totFile++;
        } else if (tipoElemento == "date" && tipoNode == "INPUT") {
            totDate++;
        } else if (tipoNode == "SELECT") {
            totSelect++;
        }
    }

    const lista = document.createElement("div");
    lista.className = "list-group";

    const crearItemLista = (texto, cantidad) => {
        if (cantidad > 0) {
            const item = document.createElement("div");
            item.className = "list-group-item d-flex justify-content-between align-items-center";
            item.textContent = texto;

            const badge = document.createElement("span");
            badge.className = "badge bg-dark rounded-pill";
            badge.textContent = cantidad;

            item.appendChild(badge);
            lista.appendChild(item);
        }
    };

    crearItemLista('Total de input[type="text"]', totText);
    crearItemLista('Total de input[type="password"]', totPass);
    crearItemLista('Total de input[type="radio"]', totRadio);
    crearItemLista('Total de input[type="checkbox"]', totCheck);
    crearItemLista('Total de input[type="date"]', totDate);
    crearItemLista('Total de input[type="email"]', totEmail);
    crearItemLista('Total de input[type="file"]', totFile);
    crearItemLista('Total de select', totSelect);

    bodyModal.appendChild(lista);

    modal.show();
};

btnEnviar.onclick = function () {
    validarFormulario();
};