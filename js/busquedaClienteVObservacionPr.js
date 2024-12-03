const clients = [
    { id: 1, name: "Carlos Pérez", email: "carlos@example.com", phone: "555-1234" },
    { id: 2, name: "María López", email: "maria@example.com", phone: "555-5678" },
    { id: 3, name: "Juan Rodríguez", email: "juan@example.com", phone: "555-9101" },
    { id: 4, name: "Ana García", email: "ana@example.com", phone: "555-1122" },
  ];

  const searchInput = document.getElementById('searchInput');
  const resultList = document.getElementById('resultList');
  const crearClienteForm = document.getElementById('crearClienteForm');

  // Búsqueda en tiempo real
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    resultList.innerHTML = '';
    resultList.classList.toggle('d-none', !query);

    if (query) {
      const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
      );

      filteredClients.forEach(client => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${client.name} (${client.email})`;
        li.addEventListener('click', () => selectClient(client));
        resultList.appendChild(li);
      });
    }
  });

  function selectClient(client) {
    document.getElementById('nombreCliente').textContent = client.name;
    document.getElementById('emailCliente').textContent = client.email;
    document.getElementById('telefonoCliente').textContent = client.phone;

    document.getElementById('clienteSeleccionado').classList.remove('d-none');
    document.querySelector('.ocultarCliente').style.display = 'none';
    resultList.classList.add('d-none');
    searchInput.value = '';
  }

  // Crear cliente y seleccionarlo
  crearClienteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreClienteNuevo').value;
    const email = document.getElementById('emailClienteNuevo').value;
    const telefono = document.getElementById('telefonoClienteNuevo').value;

    const nuevoCliente = { id: clients.length + 1, name: nombre, email, phone: telefono };
    clients.push(nuevoCliente);

    selectClient(nuevoCliente);

    const modal = bootstrap.Modal.getInstance(document.getElementById('clienteModal'));
    modal.hide();
    crearClienteForm.reset();
  });

  // Eliminar cliente seleccionado
  document.getElementById('eliminarCliente').addEventListener('click', () => {
    document.getElementById('nombreCliente').textContent = '--';
    document.getElementById('emailCliente').textContent = '--';
    document.getElementById('telefonoCliente').textContent = '--';

    document.getElementById('clienteSeleccionado').classList.add('d-none');
    document.querySelector('.ocultarCliente').style.display = 'block';

  });