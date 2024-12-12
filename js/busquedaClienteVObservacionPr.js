const clients = [
    { id: 1, name: "Carlos Pérez", email: "carlos@example.com", phone: "555-1234" },
    { id: 2, name: "María López", email: "maria@example.com", phone: "555-5678" },
    { id: 3, name: "Juan Rodríguez", email: "juan@example.com", phone: "555-9101" },
    { id: 4, name: "Ana García", email: "ana@example.com", phone: "555-1122" },
  ];

  
            // Lista de piezas para inspeccionar
            const pieces = [
              { id: 1, name: "Pantalla" },
              { id: 2, name: "Micrófono" },
              { id: 3, name: "Cámara" },
              { id: 4, name: "Altavoz" }
            ];   


  const selectedPiecesGarantia = [];
  const inspectionData = [];
   
  // Lista para almacenar inspecciones guardadas
  let savedInspections = [];

  const resultList = document.getElementById('resultList');



  function selectClient(client) {
    console.log("client",client)
    document.getElementById('nombreCliente').textContent = client.clientName;
    document.getElementById('emailCliente').textContent = client.clientEmail;
    document.getElementById('telefonoCliente').textContent = client.clientPhone;

    document.getElementById('clienteSeleccionado').classList.remove('d-none');
    document.querySelector('.ocultarCliente').style.display = 'none';
    resultList.classList.add('d-none');
    searchInput.value = '';
  }

  

  // Eliminar cliente seleccionado
  document.getElementById('eliminarCliente').addEventListener('click', () => {
    document.getElementById('nombreCliente').textContent = '--';
    document.getElementById('emailCliente').textContent = '--';
    document.getElementById('telefonoCliente').textContent = '--';

    document.getElementById('clienteSeleccionado').classList.add('d-none');
    document.querySelector('.ocultarCliente').style.display = 'block';

  });

//manejo del pantron 

  // Eventos del patrón
  const canvas = document.getElementById('patternCanvas');
  const ctx = canvas.getContext('2d');
  const points = [];
  const radius = 20;
  const gridSize = 3;
  const offset = 50;
  let isDrawing = false;
  let currentPattern = [];
  const pointsContainer = document.getElementById('pointsContainer');
  const clearButton = document.getElementById('clearPattern');
  const saveButton = document.getElementById('savePattern');
  // Array para guardar los patrones
  const savedPatterns = [];

  // Inicializa los puntos del patrón
  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
          const point = {
              x: offset + j * 100,
              y: offset + i * 100,
              selected: false,
              index: i * gridSize + j + 1  // Asigna un número al punto
          };
          points.push(point);

          // Crea un elemento div para cada punto
          const pointElement = document.createElement('div');
          pointElement.classList.add('point');  // Clase para los puntos
          pointElement.style.left = `${point.x - radius}px`;
          pointElement.style.top = `${point.y - radius}px`;
          pointElement.dataset.index = point.index;

          // Agregar el número al punto
          const number = document.createElement('span');
          number.innerText = point.index;
          pointElement.appendChild(number);

          pointsContainer.appendChild(pointElement);
      }
  }

  // Dibuja los puntos en el canvas
  function drawPoints() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpia el lienzo

      points.forEach(point => {
          // Dibuja el número sobre el punto
          const pointElement = pointsContainer.querySelector(`[data-index="${point.index}"]`);
          if (point.selected) {
              pointElement.classList.add('selected');
              pointElement.classList.remove('unselected');
          } else {
              pointElement.classList.add('unselected');
              pointElement.classList.remove('selected');
          }
      });

      drawPattern();
  }


   // Función para guardar el patrón 
   saveButton.addEventListener('click', () => {
    const pattern = currentPattern.map(point => point.index); // Guarda los índices de los puntos seleccionados
   
    
    if (pattern.length > 0) {
        
        
            // Guardar el patrón con el ticketId en el array local
            savedPatterns.push({  pattern: pattern });

            // Limpia el patrón actual
            currentPattern = []; // Limpia el patrón actual

            // Muestra el patrón guardado en el array
            console.log("Patrones guardados:", savedPatterns);

            alert("Patrón guardado: " + pattern.join(', ') );
        
    } else {
        alert("Por favor, dibuje un patrón antes de guardarlo.");
    }
});


  // Dibuja el patrón
  function drawPattern() {
      if (currentPattern.length > 0) {
          ctx.beginPath();
          ctx.moveTo(currentPattern[0].x, currentPattern[0].y);
          currentPattern.forEach(point => {
              ctx.lineTo(point.x, point.y);
          });
          ctx.strokeStyle = '#007bff';
          ctx.lineWidth = 4;
          ctx.shadowColor = '#007bff';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.closePath();
      }
  }

  // Maneja el inicio del dibujo
  canvas.addEventListener('pointerdown', (e) => {
      isDrawing = true;
      currentPattern = [];
      points.forEach(point => point.selected = false);
      handlePointerMove(e);
  });

  // Maneja el movimiento del puntero
  canvas.addEventListener('pointermove', (e) => {
      if (isDrawing) {
          handlePointerMove(e);
      }
  });

  // Maneja el fin del dibujo
  canvas.addEventListener('pointerup', () => {
      isDrawing = false;
      console.log('Patrón dibujado:', currentPattern.map(p => points.indexOf(p) + 1)); // +1 para mostrar números del 1 al 9
  });

  // Procesa el movimiento del puntero
  function handlePointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      points.forEach(point => {
          if (!point.selected && Math.hypot(point.x - x, point.y - y) < radius) {
              point.selected = true;
              currentPattern.push(point);
          }
      });

      drawPoints();
  }

  // Función para limpiar el patrón
  clearButton.addEventListener('click', () => {
      currentPattern = [];
      points.forEach(point => point.selected = false);
      drawPoints();
  });

  
  drawPoints();

//abrir el modal  de los servicios 
  $(document).on('click', '.btn-explorar-servicios', function () {
    // Muestra el modal
    $('#modalServicios').modal('show');
  });



 

        //funcion de guardado de servicios 
        function serviciosSave(ticketId){

          const selectedServices = []; // Array para almacenar los servicios seleccionados

          // Recorrer los checkboxes seleccionados en el modal
          $('#listaServicios input[type="checkbox"]:checked').each(function () {
              selectedServices.push($(this).closest('li').text().trim());
          });

          const serviciosContainer = $(`#servicios-${ticketId}`); // Seleccionar el contenedor correspondiente
          
          selectedServices.forEach(function (servicio) {
              const serviceId = servicio.replace(/\s+/g, '-').toLowerCase() + ticketId; // Crear un ID único para cada servicio
              
              console.log(serviceId); // Verifica los IDs generados

              // Verifica si ya existe un div con este ID para evitar duplicados
              if (!serviciosContainer.find(`#${serviceId}`).length) {
                  // Crear el HTML del servicio con la estructura proporcionada
                  const serviceDiv = `
                      <div class="row align-items-center service-item position-relative mt-5" data-service-id="${serviceId}" id="${serviceId}">
                          <div class="col-12 col-md-6">
                              <h6 class="m-0">${servicio}</h6>
                              <textarea class="form-control mt-2 text-white" placeholder="Descripción..." rows="1"></textarea>
                          </div>
                          <div class="col-6 col-md-3 text-center">
                              <label class="form-label">Costo</label>
                              <input type="number" class="form-control" value="0" min="0">
                          </div>
                          <div class="col-6 col-md-3 text-center">
                              <label class="form-label">Precio</label>
                              <input type="number" class="form-control" value="0" min="0">
                          </div>
                          <button class="btn btn-link text-black p-0 position-absolute top-0 end-0 remove-service" data-service-id="${serviceId}" style="transform: translate(-50%, 15%); width:auto;">
                              <i class="bi bi-trash"></i>
                          </button>
                      </div>
                  `;
                  serviciosContainer.append(serviceDiv);
              }else{
                  console.log('ya exite un servicio seleccionado')
              }
          });

          // Limpiar la selección en el modal
          $('#listaServicios input[type="checkbox"]:checked').prop('checked', false);

          // Cerrar el modal después de guardar la selección
          $('#modalServicios').modal('hide');


        }



// Manejar el clic en el botón de eliminación de servicio
$(document).on('click', '.remove-service', function() {
  const serviceId = $(this).data('service-id');
  // Eliminar el servicio correspondiente
  $(`[data-service-id="${serviceId}"]`).remove();
});

//mostrar modal de piezas o productos
$(document).on('click', '.btn-explorar-piezas', function () {
  // Muestra el modal
  $('#modalPiezas').modal('show');
});



function piezasSave(ticketId){
  const selectedPieces = [];
  $('#listaPiezas input[type="checkbox"]:checked').each(function () {
      selectedPieces.push($(this).closest('li').text().trim());
  });

  // Contenedor de piezas seleccionadas
  const piezasContainer = $(`#piezasSeleccionadas-${ticketId}`);

  selectedPieces.forEach(function (pieza) {
      // Reemplazar espacios con guiones bajos o un carácter válido
      const piezaId = `pieza-${pieza.replace(/\s+/g, '_')}-${ticketId}`;
console.log(piezaId)
      // Verificar que la pieza no haya sido añadida ya
      if (!piezasContainer.find(`#${piezaId}`).length) {
          const piezaDiv = `
              <div class="row align-items-center pieza-item position-relative mt-3" id="${piezaId}">
                  <div class="col-12 col-md-6">
                      <h6 class="m-0">${pieza}</h6>
                      <textarea class="form-control mt-2 text-white" placeholder="Descripción..." rows="1"></textarea>
                  </div>
                  <div class="col-6 col-md-3 text-center">
                      <label class="form-label">Costo</label>
                      <input type="number" class="form-control" value="0" min="0">
                  </div>
                  <div class="col-6 col-md-3 text-center">
                      <label class="form-label">Precio</label>
                      <input type="number" class="form-control" value="0" min="0">
                  </div>
                  <button class="btn btn-link text-black p-0 position-absolute top-0 end-0 remove-pieza" data-pieza-id="${piezaId}" style="transform: translate(-50%, 15%); width:auto;">
                      <i class="bi bi-trash"></i>
                  </button>
              </div>
          `;

          // Agregar la nueva pieza seleccionada
          piezasContainer.append(piezaDiv);
      }
  });

  // Cerrar el modal
  $('#modalPiezas').modal('hide');
}



// Evento para eliminar piezas seleccionadas
$(document).on('click', '.remove-pieza', function () {
  const piezaId = $(this).data('pieza-id');  // Obtener el ID de la pieza
  if (piezaId) {
      // Eliminar el contenedor de la pieza con el ID correspondiente
      $(`#${piezaId}`).remove();
  }
});

// Limpiar los checkboxes al cerrar el modal
$('#modalPiezas').on('hidden.bs.modal', function () {
  $('#listaPiezas input[type="checkbox"]').prop('checked', false);
});





       // Función para renderizar dinámicamente las piezas en el modal
       function renderPiezas(ticketId) {
        const piezasLista = document.getElementById("piezas-lista");
        piezasLista.innerHTML = ""; // Limpiar contenido previo
        pieces.forEach(piece => {
          const item = document.createElement("div");
          item.className = "d-flex align-items-center";
          item.style = "flex-basis: calc(25% - 1rem);"; // Controlar el tamaño del item (4 elementos por fila)
    
          item.innerHTML = `
            <input type="checkbox" class="form-check-input me-3" name="piezaGarantia-${ticketId}" id="piece-${piece.id}" data-id="${piece.id}">
            <label for="piece-${piece.id}" class="form-check-label">${piece.name}</label>
          `;
    
          piezasLista.appendChild(item);
        });
      }




      // Función para manejar el evento de guardar
function guardarSeleccionPiezasGarantia(ticketId) {
  const selectedCheckboxes = document.querySelectorAll(`input[name='piezaGarantia-${ticketId}']:checked`);
  
  selectedCheckboxes.forEach(checkbox => {
    const pieceId = checkbox.getAttribute("data-id");
    const selectedPiece = pieces.find(piece => piece.id == pieceId);
    if (selectedPiece) {
      selectedPiecesGarantia.push({
      ticketId: ticketId,  // Asociamos el ticketId
    pieceName: selectedPiece.name
      }
        
        
      
    );
    }
  });

  console.log("selectedPiecesGarantia",selectedPiecesGarantia)
 
}
               



const modalBody = document.querySelector('#viewSavedInspectionsModal .modal-body');
modalBody.setAttribute('id', `savedInspections`);



// Función para guardar una inspección
function saveInspection() {
  let atLeastOneSelected = false;

  pieces.forEach(piece => {
    const radios = document.querySelector(`input[name="${piece.id}"]:checked`);
    if (radios) {
      inspectionData[piece.name] = radios.value;
      atLeastOneSelected = true;
    } else {
      inspectionData[piece.name] = "No inspeccionado";
    }
  });
  
  if (!atLeastOneSelected) {
    alert("Debes seleccionar al menos un estado para guardar la inspección.");
    return;
  }
  
  // Guardar los datos en el array
  savedInspections.push({
    
    timestamp: new Date().toLocaleString(),
    data: inspectionData
  });
  
console.log("savedInspections",savedInspections)
renderSavedInspections();
}
loadInspectionItems();

 
// Función para mostrar las inspecciones guardadas
function renderSavedInspections() {
  const container = modalBody;
  console.log("container",container)
  container.innerHTML = "";

  savedInspections.forEach((inspection, index) => {
    const inspectionDiv = document.createElement("div");
    inspectionDiv.classList.add("saved-inspection");

    inspectionDiv.innerHTML = `
      <div class="header">Inspección #${index + 1} - ${inspection.timestamp} </div>
      ${Object.entries(inspection.data).map(([piece, status]) => {
        return `
          <div class="inspection-result">
            <span>${piece}</span>
            <span class="status">${status}</span>
          </div>
        `;
      }).join('')}
    `;
    container.appendChild(inspectionDiv);
  });
}



// Función para manejar el enlace de garantía
function toggleGarantiaFields(ticketId) {
  const garantiaFields = document.getElementById(`garantia-fields-${ticketId}`);
  const link = document.getElementById(`link-garantia-${ticketId}`);
  
  if (garantiaFields.style.display === "none") {
      garantiaFields.style.display = "flex"; // Mostrar campos
      link.textContent = "Quitar garantía"; // Cambiar el texto del enlace
  } else {
      garantiaFields.style.display = "none"; // Ocultar campos
      link.textContent = "Agregar garantía"; // Cambiar el texto del enlace
      // Limpiar los campos cuando se ocultan
      document.getElementById(`dias-garantia-${ticketId}`).value = "";
      document.getElementById(`comentarios-garantia-${ticketId}`).value = "";
  }
}



 // Función para cargar los elementos de inspección
 function loadInspectionItems() {
  const container = document.getElementById("inspectionItems");
  container.innerHTML = "";

  pieces.forEach(piece => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${piece.name}</td>
      <td>
        <label class="me-3">
          <input type="radio" name="${piece.id}" value="Buen estado"> Buen estado
        </label>
        <label>
          <input type="radio" name="${piece.id}" value="Mal estado"> Mal estado
        </label>
      </td>
    `;
    container.appendChild(row);
  });
}

      

      // Función para obtener los valores de los inputs de un ticket
      function getInputValues(ticketId) {
        const serial = document.getElementById(`serial-input-${ticketId}`).value;
        const imei = document.getElementById(`imei-input-${ticketId}`).value;
        const passcode = document.getElementById(`passcode-input-${ticketId}`).value;
        const retrievedData = savedPatterns;
    console.log(retrievedData); // Ahora puedes usar 'retrievedData' como una variable con los datos.
    
        return {
            serial,
            imei,
            passcode,
            pattern:retrievedData,
        };
    }
    

    
      
      
      // Función para capturar los datos de los servicios
      function obtenerDatosServicios() {
        const servicios = [];
        
        // Iteramos sobre cada item de servicio
        document.querySelectorAll('.service-item').forEach(serviceDiv => {
            const servicioId = serviceDiv.id.split('-')[1]; // Obtener ID del servicio
            const descripcion = serviceDiv.querySelector('textarea').value; // Descripción del servicio
            const costo = parseFloat(serviceDiv.querySelector('input[type="number"]').value); // Costo
            const precio = parseFloat(serviceDiv.querySelectorAll('input[type="number"]')[1].value); // Precio
            
            // Añadir el servicio a la lista
            servicios.push({
                servicioId,
                descripcion,
                costo,
                precio
            });
        });
        
        return servicios;
    }
    
    
    // Función para capturar los datos de los productos
    function obtenerDatosProductos() {
        const productos = [];
        
        // Iteramos sobre cada item de producto
        document.querySelectorAll('.pieza-item').forEach(piezaDiv => {
            const piezaId = piezaDiv.id.split('-')[1]; // Obtener ID de la pieza
            const descripcion = piezaDiv.querySelector('textarea').value; // Descripción del producto
            const costo = parseFloat(piezaDiv.querySelector('input[type="number"]').value); // Costo
            const precio = parseFloat(piezaDiv.querySelectorAll('input[type="number"]')[1].value); // Precio
            
            // Añadir el producto a la lista
            productos.push({
                piezaId,
                descripcion,
                costo,
                precio
            });
        });
        
        return productos;
    }
    
    

    document.getElementById('saveBudgetBtn').addEventListener('click', () => {
      const devices = document.querySelectorAll('#deviceInfoContainer .card');
      console.log('devices:', devices);
    
      // Cargar diagnósticos existentes del localStorage
      const DianosticoCompleto = JSON.parse(localStorage.getItem('DianosticoCompleto')) || [];
      const nuevoDiagnosticoData = [];
    
      devices.forEach(device => {
        const ticketId = device.querySelector('.badge').innerText;
        console.log('Procesando ticketId:', ticketId);
    
        // Validar si ya existe en localStorage
        const yaExisteEnStorage = DianosticoCompleto.some(diagnostico => diagnostico.ticketId === ticketId);
        if (yaExisteEnStorage) {
          console.warn(`El diagnóstico para el ticket ${ticketId} ya existe en localStorage. Se omitirá.`);
          return; // Omitir si ya existe
        }
    
        // Validar si ya se procesó en esta iteración
        const yaExisteEnIteracion = nuevoDiagnosticoData.some(diagnostico => diagnostico.ticketId === ticketId);
        if (yaExisteEnIteracion) {
          console.warn(`El diagnóstico para el ticket ${ticketId} ya existe en la iteración. Se omitirá.`);
          return; // Omitir si ya se procesó
        }
    
        const cardTitle = device.querySelector('.card-title').innerText;
        const [deviceModel, deviceBrand, receptionDate] = cardTitle.split(' - ');
    
        const diasGarantia = device.querySelector(`#dias-garantia-${ticketId}`)?.value || '';
        const comentariosGarantia = device.querySelector(`#comentarios-garantia-${ticketId}`)?.value || '';
        const comentarioProblema = device.querySelector(`#problematelefono-input-${ticketId}`)?.value || '';
        const identificaciones = getInputValues(ticketId);
        const servicios = obtenerDatosServicios();
        const productos = obtenerDatosProductos();
        const piezasGarantia = selectedPiecesGarantia.map(item => item.pieceName);
    
        const cliente = {
          nombre: document.getElementById('nombreCliente').innerText || '--',
          email: document.getElementById('emailCliente').innerText || '--',
          telefono: document.getElementById('telefonoCliente').innerText || '--',
        };
    
        const historial = [];
        if (receptionDate.toLowerCase() === 'servicio') {
          historial.push({
            status: 'Diagnóstico completado',
            notetext: 'El diagnóstico inicial indica que se trata de un servicio estándar.',
            user: 'Diego',
            role: 'Admin',
            fecha: new Date(),
          });
        } else if (receptionDate.toLowerCase() === 'garantia') {
          historial.push({
            status: 'Diagnóstico completado',
            notetext: 'El diagnóstico inicial indica que se trata de una reparación bajo garantía.',
            user: 'Diego',
            role: 'Admin',
            fecha: new Date(),
          });
        } else {
          historial.push({
            status: 'Diagnóstico en proceso (Tipo no definido)',
            notetext: 'No se especificó si es servicio o garantía.',
            user: 'Diego',
            role: 'Admin',
            fecha: new Date(),
          });
        }
        const RecepcionData =[];
    RecepcionData.push(
       {
        diasGarantia,
        comentariosGarantia,
        comentarioProblema,
        identificaciones,
        servicios,
        productos,
        piezasGarantia,
        deviceModel,
        deviceBrand,
        receptionDate,
      },
    )
        const nuevoDiagnostico = {
          ticketId,
          cliente,
          RecepcionData,
          estado: 'Diagnóstico completado',
          historial,
          fecha: document.getElementById('fechaCompromiso').value,
        };
    
        // Agregar al arreglo temporal de nuevos diagnósticos
        nuevoDiagnosticoData.push(nuevoDiagnostico);
      });
    
      // Agregar los nuevos diagnósticos al almacenamiento si hay elementos únicos
      if (nuevoDiagnosticoData.length > 0) {
        const updatedDiagnosticoCompleto = [...DianosticoCompleto, ...nuevoDiagnosticoData];
        localStorage.setItem('DianosticoCompleto', JSON.stringify(updatedDiagnosticoCompleto));
        console.log('Diagnósticos actualizados guardados en localStorage.');
      } else {
        console.warn('No se agregaron nuevos diagnósticos, todos eran duplicados.');
      }
        
    
    

      /*
    devices.forEach(device => {
     
      

   
  
     
  
    

  
  
       (function () {
         emailjs.init({
           publicKey: "DEkqe_ofMWObIMdfG",
          });
        })();
        
        
        
     // Lista de destinatarios
     const destinatarios = [
       { nombre: "Navas", email: "cabreranavas43@gmail.com" },
    { nombre: "Salome", email: "salome33hernandes@gmail.com" },
  ];
  
  if (nuevoPresupuesto && nuevoPresupuesto.cliente) {
    destinatarios.push({
      nombre: nuevoPresupuesto.cliente.nombre,
      email: nuevoPresupuesto.cliente.email,
    });
  }
  console.log(destinatarios);
  
  // Función para enviar correos
  function enviarCorreos(mensaje) {
    const envios = destinatarios.map((destinatario) => {
      const params = {
        from_name: 'BARATTO',
        to_name: destinatario.nombre,
        to_email: destinatario.email,
        message_html: mensaje,
      };
  
      return emailjs
        .send('service_y96c0us', 'template_f3rru9k', params)
        .then(() => {
          console.log(`Correo enviado correctamente a ${destinatario.email}`);
        })
        .catch((error) => {
          console.error(`Error al enviar correo a ${destinatario.email}:`, error);
          throw error; // Propaga el error para manejo centralizado
        });
    });
  
    // Maneja el final de todos los envíos
    Promise.allSettled(envios).then((resultados) => {
      const enviados = resultados.filter((res) => res.status === 'fulfilled');
      const fallidos = resultados.filter((res) => res.status === 'rejected');
  
      console.log(`Envíos completados. Éxitos: ${enviados.length}, Fallos: ${fallidos.length}`);
    });
  }
  console.log('Hola',nuevoPresupuesto.cliente.nombre)
  
  console.log('Hola',)
  // Llamada a la función para enviar correos
  // Generar contenido del mensaje dinámico
  
  // Generar contenido del mensaje dinámico
  // Generar contenido del mensaje dinámico
  const mensajeHTML = `
    
      <p>¿Apruebas el presupuesto? Haz clic en el enlace correspondiente para responder:</p>
    <a href="https://tusitio.com/aprobar-presupuesto?id=123" style="display: inline-block; background-color: green; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-weight: bold;">Aprobar</a>
    <a href="https://tusitio.com/rechazar-presupuesto?id=123" style="display: inline-block; background-color: red; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-left: 10px;">Rechazar</a>
    <p>Si necesitas más información, no dudes en contactarnos.</p>
    <p>Saludos,<br>Equipo BARATTO</p>
  `;
  
  
  enviarCorreos(mensajeHTML);
  
  
      // Mostrar mensaje de éxito
      alert('Presupuesto guardado con éxito');
      console.log('Presupuesto Completo:', presupuestoCompleto);

      */
  });
  
  
  