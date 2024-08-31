document.getElementById("formcontacto").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let nombres = document.getElementById("txtnombres");
    let apellidos = document.getElementById("txtapellidos");
    let email = document.getElementById("txtemail");
    let mensaje = document.getElementById("txtmensaje");
    let alerta = document.getElementById("mensaje_alerta");


    alerta.style.display = "block";
    console.log("Datos del Contacto:");
    console.log(`Nombres: ${nombres.value}`);
    console.log(`Apellidos: ${apellidos.value}`);
    console.log(`Email: ${email.value}`);
    console.log(`Mensaje: ${mensaje.value}`);

    nombres.value = "";
    apellidos.value = "";
    email.value = "";
    mensaje.value = "";
});

