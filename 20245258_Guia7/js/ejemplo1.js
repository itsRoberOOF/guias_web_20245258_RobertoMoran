const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const buttonValidar = document.getElementById("idBtnValidar");

// Función para verificar el tipo de elemento a crear
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
}

// Elemento → SELECT
const newSelect = function () {
    let addElemento = document.createElement("select");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
}

//Elementos → RADIO o CHECKBOX
const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
}
0
// Elementos → TEXTAREA, TEXT, NUMBER, DATE U OTRO
const newInput = function (newElemento) {
    let addElemento = newElemento == "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    if (newElemento === "color") {
        addElemento.setAttribute("class", "form-control form-control-color");
        addElemento.value = "#000000";
        //Esto para que ocupe todo el ancho, ya que por defecto los input color son pequeños
        addElemento.style.width = "100%";
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);

}

buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        let idPropuesto = `id${nombreElemento.value}`;
        let idExistente = document.getElementById(idPropuesto);

        if (idExistente) {
            alert(`Error. El ID "${idPropuesto}" ya existe en el formulario. Elije otro`);
            return;
        }

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
}

//Validar campos
buttonValidar.onclick = () => {
    let inputs = newForm.querySelectorAll("input, select, textarea");

    if (inputs.length === 0) {
        alert("No hay elementos en el formulario para validar.");
        return;
    }

    let errores = [];

    inputs.forEach((input) => {
        // Validar selección en checkbox y radio
        if (input.type === "checkbox" || input.type === "radio") {
            if (!input.checked) {
                errores.push(`El control ${input.id} no ha sido seleccionado`);
            }
        } else {
            // Validar inputs de texto, select, color, email, etc.
            if (input.value.trim() === "") {
                errores.push(`El control ${input.id} está vacío`);
            }
        }
    });

    if (errores.length > 0) {
        alert("Errores de validación:\n\n" + errores.join("\n"));
    } else {
        alert("Todos los controles han sido validados correctamente");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});