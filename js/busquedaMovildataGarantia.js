const response = await fetch('../dataTelefonia/dataGarantia.json');
const RecepcioData = await response.json();
console.log("RecepcioData", RecepcioData);

function esGarantiaVigente(result) {
    // Verifica la estructura de result y RecepcionData
  
    // Asegúrate de que result.RecepcionData tenga datos
    if (!result || !result.RecepcionData || result.RecepcionData.length === 0) {
        console.error("No hay datos de recepción.");
        return false;
    }

    // Acceder a la propiedad 'vigencia'
    const vigencia = result.RecepcionData[0].datosGarantia.vigencia;

 

    // Validar que la propiedad vigencia exista y tenga el formato adecuado
    if (!vigencia || vigencia.indexOf(" a ") === -1) {
        console.error("El formato de vigencia no es válido o está vacío.");
        return false; // Si no es válido, devolvemos false
    }

   /// Separar las fechas de inicio y fin
   const fechas = vigencia.split(" a ");
   
   // Asegúrate de que las fechas estén bien formateadas como 'YYYY-MM-DD'
   const fechaInicio = new Date(fechas[0] + "T00:00:00");  // Convertir la fecha de inicio a objeto Date con hora 00:00:00
   const fechaFin = new Date(fechas[1] + "T00:00:00");     // Convertir la fecha de fin a objeto Date con hora 00:00:00
   
   // Para depuración: Verifica que las fechas se capturen correctamente
   console.log("fechaInicio:", fechaInicio);
   console.log("fechaFin:", fechaFin);

   // Obtener la fecha actual y establecerla a las 00:00:00
   const fechaActual = new Date();
   fechaActual.setHours(0, 0, 0, 0);  // Fijar hora de la fecha actual a las 00:00:00

   // Imprimir para depuración
   console.log("fechaActual", fechaActual);
    console.log( "fechas",fechas)
    console.log("fechaActual",fechaActual)
    console.log("fechaInicio",fechaInicio)
    console.log("fechaFin",fechaFin)
    // Comparar la fecha actual con el rango de vigencia
    if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
        console.log(`La garantía está vigente. La fecha actual (${fechaActual.toLocaleDateString()}) está dentro del rango de vigencia: desde ${fechaInicio.toLocaleDateString()} hasta ${fechaFin.toLocaleDateString()}.`);
        return true; // La garantía sigue vigente
    } else {
        console.log(`La garantía ha expirado. La fecha actual (${fechaActual.toLocaleDateString()}) está fuera del rango de vigencia: desde ${fechaInicio.toLocaleDateString()} hasta ${fechaFin.toLocaleDateString()}.`);
        return false; // La garantía ha expirado
    }
    
}


$('#buscarMovilGarantia').click(function() {
    var searchValue = $('#buscarImei').val();
    // Buscar el dispositivo que tiene ese IMEI o Serial
const result = RecepcioData.find(item =>
    item.RecepcionData.some(data =>
      data.identificaciones.imei === searchValue || data.identificaciones.serial === searchValue
    )

  );

  console.log("result:",result)
  const bandera =  esGarantiaVigente(result);
  console.log(bandera)
  if(bandera == true){
  //  $('#contenedorDataG').removeClass('d-none');
    $("#seccionBusquedaGarantia").hide(); // Oculta el div
    renderDataGarantia(result);
}

});


function renderDataGarantia(result) {
    const ticketId = result.RecepcionData[0].ticketId; // Usamos el ticketId desde result
   
        const deviceContainer = document.getElementById("deviceInfoContainerG");

    const deviceCard = document.createElement("div");
    deviceCard.className = "card mb-3";

    // Crear el contenido HTML dinámico para la tarjeta
    deviceCard.innerHTML = `
    <div id="card-${ticketId}" class="card shadow-sm border-0 bg-dark text-light">
        <div class="transpare card-header d-flex justify-content-between align-items-center text-white">
            <h5 class="card-title mb-0 text-truncate">${result.RecepcionData[0].deviceModel}</h5>
            <span class="badge bg-primary">${ticketId}</span>
            <button class="btn btn-sm btn-light toggle-button d-flex align-items-center" type="button">
                <span class="me-1 d-none">Contraer</span>
                <i class="bi bi-chevron-up"></i>
            </button>
        </div>
        <div class="card-body">
            <!-- Opciones de Identificación -->
            <div class="d-flex align-items-center mb-3 flex-wrap">
                <div class="form-check me-3">
                    <input class="form-check-input" type="checkbox" name="identification-${ticketId}" value="serial" id="serial-${ticketId}" checked>
                    <label class="form-check-label text-light" for="serial-${ticketId}">Número de serie</label>
                </div>
                <div class="form-check me-3">
                    <input class="form-check-input" type="checkbox" name="identification-${ticketId}" value="imei" id="imei-${ticketId}">
                    <label class="form-check-label text-light" for="imei-${ticketId}">IMEI</label>
                </div>
                <div class="form-check me-3">
                    <input class="form-check-input" type="checkbox" name="identification-${ticketId}" value="passcode" id="passcode-${ticketId}">
                    <label class="form-check-label text-light" for="passcode-${ticketId}">Passcode</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="identification-${ticketId}" value="pattern" id="pattern-${ticketId}">
                    <label class="form-check-label text-light" for="pattern-${ticketId}">Patrón</label>
                </div>
            </div>

            <!-- Inputs dinámicos -->
            <div class="row mb-3 gap-2">
                <input type="text" class="form-control w-auto bg-dark text-light border-secondary" placeholder="Ingrese un número de serie" id="serial-input-${ticketId}" style="display: none;">
                <input type="text" class="form-control w-auto bg-dark text-light border-secondary" placeholder="Ingrese un IMEI" id="imei-input-${ticketId}" style="display: none;">
                <input type="text" class="form-control w-auto bg-dark text-light border-secondary" placeholder="Ingrese un passcode" id="passcode-input-${ticketId}" style="display: none;">
                <button class="btn btn-primary w-auto btn-pattern-${ticketId}" data-bs-toggle="modal" data-bs-target="#patternModal" style="display: none;">Dibujar Patrón</button>
            </div>

            <!-- Descripción del problema -->
            <div class="mb-3">
                <textarea id="problematelefono-input-${ticketId}" class="form-control bg-dark text-light border-secondary" placeholder="Descripción del Problema" rows="2"></textarea>
            </div>

            <!-- Servicios -->
            <div class="mb-3">
                <h6 class="text-light">Servicios de reparación</h6>
                <div class="input-group mb-3">
                    <input type="text" class="form-control bg-dark text-light border-secondary" placeholder="Buscar servicios">
                    <button class="btn btn-outline-primary btn-explorar-servicios" type="button" data-ticket-id="${ticketId}">Explorar</button>
                </div>
                <div class="servicios-seleccionados" id="servicios-${ticketId}">
                    <!-- Los servicios seleccionados aparecerán aquí -->
                </div>
            </div>

            <!-- Productos -->
            <div class="mb-3">
                <h6 class="text-light">Productos</h6>
                <div class="input-group">
                    <input type="text" class="form-control bg-dark text-light border-secondary" placeholder="Buscar productos">
                    <button class="btn btn-outline-primary btn-explorar-piezas" type="button">Explorar</button>
                </div>
                <div class="piezas-seleccionados" id="piezasSeleccionadas-${ticketId}">
                    <!-- Los productos seleccionados aparecerán aquí -->
                </div>
            </div>

            <!-- Inspección -->
            <div class="p-3 rounded mb-3">
                <p class="text-white mb-2">Inspección del Producto</p>
                <div id="inpeccionP-fields-${ticketId}" class="row gap-3 align-items-center">
                    <button class="btn btn-primary me-2" style="width: 220px; height: 50px;" data-bs-toggle="modal" data-bs-target="#addInspectionModal">
                        Agregar Inspección
                    </button>
                    <button class="btn btn-secondary" style="width: 260px; height: 50px;" data-bs-toggle="modal" data-bs-target="#viewSavedInspectionsModal">
                        Ver Inspecciones Guardadas
                    </button>
                </div>
            </div>

            <!-- Garantía -->
            <div class="p-3 rounded mb-3">
                <p class="text-white mb-2" id="link-garantia-${ticketId}" style="cursor: pointer;">Agregar garantía?</p>
                <div id="garantia-fields-${ticketId}" class="row gap-3 align-items-center" style="display: none;">
                    <input type="number" class="form-control bg-dark text-light border-secondary w-25" id="dias-garantia-${ticketId}" placeholder="Días de garantía">
                    <textarea class="form-control bg-dark text-light border-secondary w-50" id="comentarios-garantia-${ticketId}" placeholder="Comentarios de la garantía" rows="1"></textarea>
                </div>
            </div>
        </div>
    </div>`;

    // Agregar la tarjeta al contenedor principal (esto debe hacerse en el contenedor adecuado en tu HTML)
    deviceContainer.appendChild(deviceCard);

    const checkboxes = document.querySelectorAll(`[name="identification-${ticketId}"]`);

    // Establecemos el estado inicial de los checkboxes según los datos en result
    checkboxes.forEach((checkbox) => {
        // Verificamos si existe el valor en result para este checkbox
        const identificationValue = result.RecepcionData[0].identificaciones[checkbox.value];
        
        // Aquí verificamos si el campo 'pattern' está vacío y lo manejamos apropiadamente
        if (checkbox.value === 'pattern') {
            // Si el array 'pattern' está vacío, desmarcamos el checkbox
            if (Array.isArray(identificationValue) && identificationValue.length === 0) {
                checkbox.checked = false;
            } else {
                checkbox.checked = true;
            }
        } else {
            // Si el valor no es un array vacío, simplemente verificamos si hay un valor y marcamos el checkbox
            if (identificationValue !== undefined && identificationValue !== "") {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        }
    
        // Llamamos a toggleInputs para inicializar el estado de los inputs
        toggleInputs(checkbox, identificationValue);
    
        // Añadir el evento de cambio
        checkbox.addEventListener("change", function () {
            console.log(`Checkbox ${this.value} checked: ${this.checked}`);
    
            // Verificar la identificación asociada al checkbox
            const identificationValue = result.RecepcionData[0].identificaciones[this.value];
            toggleInputs(this, identificationValue);  // Llamamos a la función para mostrar u ocultar inputs
        });
    });
    
    // Lógica para manejar el número máximo de selecciones
    let maxSelections = 2; // Número máximo de selecciones
    let selected = [];  // Reiniciar la lista de seleccionados
    
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            // Si el checkbox está marcado, lo agregamos a la lista
            if (this.checked) {
                selected.push(this);
    
                // Si se supera el máximo permitido, desmarcamos el más antiguo
                if (selected.length > maxSelections) {
                    const oldest = selected.shift();
                    oldest.checked = false;
                }
            } else {
                // Si el checkbox se desmarca, lo eliminamos de la lista
                selected = selected.filter((item) => item !== this);
            }
    
            // Mostrar u ocultar los inputs basados en los checkboxes seleccionados
            document.getElementById(`serial-input-${ticketId}`).style.display = selected.some((item) => item.value === "serial") ? "block" : "none";
            document.getElementById(`imei-input-${ticketId}`).style.display = selected.some((item) => item.value === "imei") ? "block" : "none";
            document.getElementById(`passcode-input-${ticketId}`).style.display = selected.some((item) => item.value === "passcode") ? "block" : "none";
            document.querySelector(`.btn-pattern-${ticketId}`).style.display = selected.some((item) => item.value === "pattern") ? "block" : "none";
        });
    });
    
    // Función para mostrar/ocultar inputs y actualizar valores
    function toggleInputs(checkbox, identificationValue) {
        const inputId = `${checkbox.value}-input-${ticketId}`;  // ID del input basado en el valor del checkbox
        const inputElement = document.getElementById(inputId);  // Obtener el elemento input correspondiente
    
        // Log para depuración
        console.log(`Toggling input for: ${inputId}, identificationValue: ${identificationValue}`);
    
        // Verifica si el input existe
        if (inputElement) {
            // Si el checkbox está marcado o si hay un valor en identificationValue, mostramos el input
            if (checkbox.checked || identificationValue !== "") {
                inputElement.style.display = "block";  // Mostrar el input
                inputElement.value = identificationValue || "";  // Rellenar con datos si existen
                console.log(`Showing input: ${inputId}`);
            } else {
                inputElement.style.display = "none";  // Ocultar el input
                console.log(`Hiding input: ${inputId}`);
            }
        } else {
            // Si el input no existe, mostrar advertencia
            console.warn(`Input element not found: ${inputId}`);
        }
    
        // Lógica para el botón 'pattern'
        if (checkbox.value === "pattern") {
            const patternBtn = document.querySelector(`.btn-pattern-${ticketId}`);
            if (patternBtn) {
                const shouldDisplayPattern = checkbox.checked || (identificationValue && identificationValue.length > 0);
                patternBtn.style.display = shouldDisplayPattern ? "block" : "none";
                console.log(`Toggling pattern button: ${shouldDisplayPattern}`);
            } else {
                console.warn(`Pattern button not found: .btn-pattern-${ticketId}`);
            }
        }
    }
    

    


}
