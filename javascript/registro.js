class Usuario {
    constructor(nombre, apellido, email, contrasena, direccion, rolId) {
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.rolId = rolId;
        this.direccion = direccion;
        this.apellido = apellido;
        this.telefono = "3157703322"
    }
}

const formulario = document.querySelector("form");
const nombre = document.querySelector("#floatingInputNombre");
const apellido = document.querySelector("#floatingInputApellido");
const direccion = document.querySelector("#floatingInputDireccion");
const correo = document.querySelector("#floatingInputCorreo");
const usuario = document.querySelector("#floatingInputUsuario");
const id = document.querySelector("#floatingInputId");
const contrasena = document.querySelector("#floatingInputContraseña");
const contrasena2 = document.querySelector("#floatingInputContraseña2");
const botonacepto = document.querySelector("#exampleModal > div > div > div.modal-footer > button.btn.btn-primary");

const options = document.querySelectorAll("body > main > section.formulario.bg-light > form > fieldset > input[type=checkbox]")  

let idValor = 0

console.log(options)
options.forEach(posibility => {
    posibility.addEventListener("change", event => {
        idValor = parseInt(posibility.value);
        console.log(idValor);
        if (posibility.checked) {
            options.forEach(otherCheckbox => {
                if (otherCheckbox !== posibility) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});
botonacepto.addEventListener("click", (event) => {

    console.log("ejecutando")
    
    // Obtener los valores de los inputs
    const nombreValor = nombre.value;
    const apellidoValor = apellido.value;
    const direccionValor = direccion.value;
    const correoValor = correo.value;
    const usuarioValor = usuario.value;
    const contrasenaValor = contrasena.value;
    const contrasena2Valor = contrasena2.value;

    // Aquí puedes agregar la lógica para manejar el formulario, por ejemplo:
    console.log(`Nombre: ${nombreValor}`);
    console.log(`Apellido: ${apellidoValor}`);
    console.log(`Dirección: ${direccionValor}`);
    console.log(`Correo: ${correoValor}`);
    console.log(`Usuario: ${usuarioValor}`);
    console.log(`ID: ${idValor}`);
    console.log(`Contraseña: ${contrasenaValor}`);
    console.log(`Repetir Contraseña: ${contrasena2Valor}`);

    // Validación de contraseñas
    if (contrasenaValor !== contrasena2Valor) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const nuevoUsuario = new Usuario(nombreValor, apellidoValor, correoValor, contrasenaValor, direccionValor, idValor);

    console.log(JSON.stringify(nuevoUsuario)); 
    console.log("*******************************")
    // Enviar la solicitud POST con fetch
    fetch("http://localhost:8080/api/v1/agricol/auth/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoUsuario)
    })
    .then(response => {
        if (!response.ok) {
            console.log(response)
            throw new Error("Network response was not ok " + response.statusText + response.body.errors);
        }
        return response.json();
    })
    .then(data => {
        console.log("Success:", data);
        window.location.href = '/login'
        // Aquí puedes manejar la respuesta del servidor
    })
    .catch(error => {
        console.error("Error:", error);
        // Aquí puedes manejar el error
    });

    document.querySelector('#exampleModal > div > div > div.modal-header > button').click();

})