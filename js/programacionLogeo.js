document.addEventListener('DOMContentLoaded', function() {
    toastr.options = {
        "closeButton": false, // Cerrar botón
        "debug": false, // Depuración
        "newestOnTop": false, // Lo más nuevo en la parte superior
        "progressBar": false, // Barra de progreso
        "positionClass": "toast-top-right", // Ubicación de la notificación
        "preventDuplicates": false, // Prevenir duplicados
        "onclick": null, // Acción al hacer clic
        "showDuration": "150", // Duración del show
        "hideDuration": "100", // Duración del hide
        "timeOut": "1500", // Tiempo de espera
        "extendedTimeOut": "1000", // Tiempo extendido
        "showEasing": "swing", // Easing al mostrar
        "hideEasing": "linear", // Easing al ocultar
        "showMethod": "fadeIn", // Método de mostrar
        "hideMethod": "fadeOut" // Método de ocultar
    };

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        console.log("Formulario enviado.");
      
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log("Datos capturados:");
        console.log("Usuario:", username);
        console.log("Contraseña:", password);

        try {
            // Cargar el archivo JSON con fetch
            const response = await fetch('../dataTelefonia/user.json');
            const users = await response.json();
            console.log("users", users);

            // Validar usuario y contraseña
            const userFound = users.find(user => user.username === username && user.password === password);
            console.log("userFound", userFound);

            if (userFound) {
                console.log("Acceso permitido para:", userFound.username);
                toastr.success("Éxito al iniciar sesión");
                // Redirigir al dashboard
              //  window.location.href = "dashboard.html";
            } else {
                toastr.error("Usuario o contraseña incorrectos.", "Error de autenticación");
                console.log("Intento fallido de inicio de sesión.");
            }
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
            toastr.error("Ocurrió un error al procesar tu solicitud. Intenta nuevamente.", "Error");
        }
    });
});
