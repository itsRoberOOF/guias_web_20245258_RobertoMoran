document.addEventListener("DOMContentLoaded", function () {
    //Acceder al contenedor donde se muestran los estudiantes
    const containerEstudiantes = document.querySelector("#idContainerEstudiantes"); 

    //Acceder a cada boton con API DOM
    const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
    const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");

    //Evento click a los botones 
    btnAddEstudiante.addEventListener("click", addEstudiantes);
    btnViewEstudiantes.addEventListener("click", viewEstudiantes);

    //Arreglo global
    let arrayEstudiantes = new Array();

    //Funciones
    function addEstudiantes() {
        const inputCarnet = document.querySelector("#inputCarnet").value.toString().toUpperCase();
        const inputNombre = document.querySelector("#inputNombre").value.toString().toUpperCase();
        const inputApellido = document.querySelector("#inputApellido").value.toString().toUpperCase();

        if (inputCarnet != "" && inputNombre != "" && inputApellido != "") {
            arrayEstudiantes.push(new Array(inputCarnet, inputNombre, inputApellido));
            alert("Se registro el nuevo estudiante");

            //Limpiando campos del formulario
            document.querySelector("#inputCarnet").value = "";
            document.querySelector("#inputNombre").value = "";
            document.querySelector("#inputApellido").value = "";
            document.querySelector("#inputCarnet").focus();
        }else{
            alert("Faltan campos que completar");
        }
    }

    function viewEstudiantes() {
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
                carnet = arrayEstudiantes[i][0];
                nombres = arrayEstudiantes[i][1];
                apellidos = arrayEstudiantes[i][2];

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
});