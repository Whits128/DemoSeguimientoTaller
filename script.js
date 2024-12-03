$(document).ready(function() {

    // Datos de ejemplo para la reparación
    let ticketData = {
        ticketId: "TICKET-001",
        customerName: "Juan Pérez",
        customerPhone: "555-1234",
        device: "Samsung Galaxy S21",
        issue: "Pantalla dañada",
        totalCost: "$200.00",
        repairStatus: "Pendiente",
        technicianNotes: "",
        history: [
            { date: "2024-11-30", action: 'Reparación marcada como "En proceso" por el técnico.' }
        ]
    };

    // Función para mostrar los detalles del ticket
    function displayTicketDetails() {
        $('#detailTicketId').text(ticketData.ticketId);
        $('#detailCustomerName').text(ticketData.customerName);
        $('#detailCustomerPhone').text(ticketData.customerPhone);
        $('#detailDevice').text(ticketData.device);
        $('#detailIssue').text(ticketData.issue);
        $('#detailTotalCost').text(ticketData.totalCost);
        $('#repairProgress').val(ticketData.repairStatus);
        $('#progressNotes').val(ticketData.technicianNotes);
        
        // Mostrar historial de actualizaciones
        $('#updateHistory').empty();
        ticketData.history.forEach(update => {
            const historyItem = `<li class="list-group-item"><strong>${update.date}:</strong> ${update.action}</li>`;
            $('#updateHistory').append(historyItem);
        });
    }

    // Al cambiar el estado de la reparación
    $('#repairProgress').change(function() {
        ticketData.repairStatus = $(this).val();
    });

    // Al agregar notas del técnico
    $('#progressNotes').on('input', function() {
        ticketData.technicianNotes = $(this).val();
    });

    // Al hacer clic en "Aprobar Presupuesto"
    $('#approveBudget').click(function() {
        alert("Presupuesto aprobado.");
        ticketData.history.push({
            date: new Date().toISOString().split('T')[0],
            action: `Presupuesto aprobado por el cliente.`
        });
        displayTicketDetails();  // Actualizar el historial y la vista
    });

    // Al hacer clic en "Rechazar Presupuesto"
    $('#rejectBudget').click(function() {
        alert("Presupuesto rechazado.");
        ticketData.history.push({
            date: new Date().toISOString().split('T')[0],
            action: `Presupuesto rechazado por el cliente.`
        });
        displayTicketDetails();  // Actualizar el historial y la vista
    });

    // Al hacer clic en "Guardar Cambios"
    $('#saveProgress').click(function() {
        alert("Cambios guardados.");
        ticketData.history.push({
            date: new Date().toISOString().split('T')[0],
            action: `Estado actualizado a "${ticketData.repairStatus}" y notas guardadas.`
        });
        displayTicketDetails();  // Actualizar el historial y la vista
    });

    // Al hacer clic en "Marcar como Completado"
    $('#completeRepair').click(function() {
        ticketData.repairStatus = "Completado";
        alert("Reparación marcada como completada.");
        ticketData.history.push({
            date: new Date().toISOString().split('T')[0],
            action: `Reparación marcada como completada.`
        });
        displayTicketDetails();  // Actualizar el historial y la vista
    });

    // Inicializar la vista con los datos de ejemplo
    displayTicketDetails();

});
