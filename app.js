// Simulación de reparaciones iniciales
let reparaciones = JSON.parse(localStorage.getItem("reparaciones")) || [
    { id: 1, cliente: "Juan Pérez", dispositivo: "iPhone 12", estado: "Recibido", tecnico: "Técnico A", costo: 150, fecha: "2024-11-29" },
    { id: 2, cliente: "Ana Gómez", dispositivo: "Samsung S21", estado: "Diagnóstico", tecnico: "Técnico B", costo: 0, fecha: "2024-11-28" },
  ];
  
  // Guardar datos en localStorage
  function guardarLocalStorage() {
    localStorage.setItem("reparaciones", JSON.stringify(reparaciones));
  }
  
  // Renderizar tabla
  function renderTabla() {
    const tbody = $("#tableReparaciones tbody");
    tbody.empty();
    reparaciones.forEach(rep => {
      tbody.append(`
        <tr>
          <td>${rep.id}</td>
          <td>${rep.cliente}</td>
          <td>${rep.dispositivo}</td>
          <td>${rep.estado}</td>
          <td>${rep.tecnico}</td>
          <td>$${rep.costo}</td>
          <td>${rep.fecha}</td>
          <td>
            <button class="btn btn-warning btn-sm btnEditar" data-id="${rep.id}">Editar</button>
          </td>
        </tr>
      `);
    });
  }
  
  // Filtrar datos
  $("#btnFilter").click(() => {
    const estado = $("#filterEstado").val();
    const cliente = $("#filterCliente").val().toLowerCase();
    const tecnico = $("#filterTecnico").val().toLowerCase();
  
    const resultados = reparaciones.filter(rep => 
      (estado === "" || rep.estado === estado) &&
      (cliente === "" || rep.cliente.toLowerCase().includes(cliente)) &&
      (tecnico === "" || rep.tecnico.toLowerCase().includes(tecnico))
    );
  
    renderTabla(resultados);
  });
  
  // Abrir modal para editar
  $(document).on("click", ".btnEditar", function () {
    const id = $(this).data("id");
    const reparacion = reparaciones.find(rep => rep.id === id);
    $("#editTicketId").val(reparacion.id);
    $("#editCliente").val(reparacion.cliente);
    $("#editDispositivo").val(reparacion.dispositivo);
    $("#editEstado").val(reparacion.estado);
    $("#editTecnico").val(reparacion.tecnico);
    $("#editCosto").val(reparacion.costo);
    $("#modalEditar").modal("show");
  });
  
  // Guardar edición
  $("#formEditar").submit(function (e) {
    e.preventDefault();
    const id = parseInt($("#editTicketId").val());
    const index = reparaciones.findIndex(rep => rep.id === id);
  
    reparaciones[index] = {
      id,
      cliente: $("#editCliente").val(),
      dispositivo: $("#editDispositivo").val(),
      estado: $("#editEstado").val(),
      tecnico: $("#editTecnico").val(),
      costo: parseFloat($("#editCosto").val()),
      fecha: reparaciones[index].fecha,
    };
  
    guardarLocalStorage();
    renderTabla();
    $("#modalEditar").modal("hide");
  });
  
  // Inicializar tabla
  $(document).ready(() => {
    renderTabla();
  });
  