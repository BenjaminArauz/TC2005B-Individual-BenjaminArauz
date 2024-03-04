const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');

const html_head = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <style>
        .quantity {
            border: 2px solid black;
            width: 100%;
            height: 2rem;
            text-align: center;
            border-radius: 10px;
        }
        
        .prices-table {
            text-align: end;
        }
        
        .notification {
            display: none;
            transition: opacity 1s ease;
        }
    </style>
    <title>Document</title>
</head>
<body>

    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <img src="https://i.ibb.co/zrvrR8F/logo.png" alt="Tienda online" class="navbar-item" width="112" height="28">
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/">
                    Home
                </a>
            
                <a class="navbar-item" href="/agregar">
                    Agregar
                </a>

                <a class="navbar-item" href="/validar-contrasiena">
                    Validar contraseña
                </a>

                <a class="navbar-item" href="/feedback/ayuda">
                    Ayuda
                </a>

                <a class="navbar-item" href="/feedback/preguntas-referencias">
                    Preguntas y referencias
                </a>
            </div>
    </nav>
`;

const html_main = `
    <main>
        <section class="container">
            <div class="notification is-link" id="product_notification">
                Lo siento, no se puede poner productos negativos
            </div>
`;

const html_footer = `    
</section>
<footer class="footer">
<div class="content has-text-left">
    <p class="title is-4">Referencias</p>
    <ul>
        <li>
            <a href="https://www.freecodecamp.org/news/whats-the-document-object-model-and-why-you-should-know-how-to-use-it-1a2d0bc5429d/">https://www.freecodecamp.org/news/whats-the-document-object-model-and-why-you-should-know-how-to-use-it-1a2d0bc5429d/</a>
        </li>
        <li>
            <a href="https://www.w3schools.com/tags/ref_eventattributes.asp">https://www.w3schools.com/tags/ref_eventattributes.asp</a>
        </li>
        <li>
            <a href="https://www.w3schools.com/js/js_htmldom_nodes.asp">https://www.w3schools.com/js/js_htmldom_nodes.asp</a>
        </li>
    </ul>
</div>
</footer>
</body>
</html>
`;

const html_carro = `
<div class="column">
<table class="table is-striped is-fullwidth">
    <thead>
        <tr>
            <th class="is-size-4">Total a pagar</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th class="is-size-5">Productos: </th>
        </tr>
        <tr id="row_cellphone"></tr>
        <tr id="row_laptop"></tr>
        <tr id="row_xbox"></tr>
    </tbody>
    <tfoot>
        <tr>
            <th class="is-size-5">Total a pagar: $<span id="final_price">0</span></th>
        </tr>
    </tfoot>
</table>
<button class="button is-success is-outlined is-fullwidth" id="reset_button">Reset</button>
</div> 
`;

const html_script = `
<script>
function scroll_section(section){
    section.scrollIntoView({ behavior: 'smooth' });
}

//Función para añadir un producto
const add_product = (num, quantity_element, substract_button, row) => {
    
    //Actualizar el valor dentro de la página y en purchase
    purchase[num].quantity++;
    quantity_element.innerHTML = purchase[num].quantity;
    if (purchase[num].quantity > 0){
        substract_button.style.display = "block"

        //Insertar en el documento
        if (purchase[num].quantity == 1){
            row.innerHTML = "<td>" + purchase[num].name + " (" + purchase[num].quantity + ")</td>";
        } else {
            const index = row.innerHTML.indexOf("(");
            row.innerHTML = row.innerHTML.substring(0, index + 1) + purchase[num].quantity + row.innerHTML.substring(index + 2);
        }
    }

    //Sumar al total a pagar
    let final_price_before = parseInt(final_price.innerHTML.split(".").join(""));
    final_price.innerHTML = final_price_before + purchase[num].price;
}

//Función para eliminar un producto
const delete_product = (num, quantity_element, substract_button, row) => {
    //Sumar al total a pagar
    if (purchase[num].quantity > 0){
        let final_price_before = parseInt(final_price.innerHTML.split(".").join(""));
        final_price.innerHTML = final_price_before - purchase[num].price;

        purchase[num].quantity--;
        quantity_element.innerHTML = purchase[num].quantity;

        //Remover la información del documento
        if (purchase[num].quantity == 0){
            row.innerHTML = "";
        } else {
            const index = row.innerHTML.indexOf("(");
            row.innerHTML = row.innerHTML.substring(0, index + 1) + purchase[num].quantity + row.innerHTML.substring(index + 2);
        }
    } else if (purchase[num].quantity == 0){
        //Desplegar la información de la notificación
        const product_notification = document.getElementById("product_notification");
        product_notification.style.display = "block";
        scroll_section(product_notification);
        product_notification.style.opacity = "1";
        //Desaparecer la información, uso del TimeOut
        setTimeout(() => {
            product_notification.style.opacity = "0";
            
        }, 3000);
    }
}

let final_price = document.getElementById("final_price");

/* Variables del teléfono */
const quantity_cellphone = document.getElementById("quantity_cellphone"); //Cantidad
const name_cellphone = document.getElementById("name_cellphone"); //Nombre
const price_cellphone = document.getElementById("price_cellphone"); //Precio
let row_cellphone = document.getElementById("row_cellphone"); //Columna

//Botones
const sum_button_cellphone = document.getElementById("sum_button_cellphone");
const substract_button_cellphone = document.getElementById("substract_button_cellphone");

//Actualización en purchase
purchase[0].name = name_cellphone.innerHTML;
purchase[0].price = parseInt(price_cellphone.innerHTML.split(".").join(""));

sum_button_cellphone.onclick = function(){
    add_product(0, quantity_cellphone, substract_button_cellphone, row_cellphone);
};

substract_button_cellphone.onclick = function(){
    delete_product(0, quantity_cellphone, substract_button_cellphone, row_cellphone);
};

/* Variables de la computadora */
const quantity_laptop = document.getElementById("quantity_laptop"); //Cantidad
const name_laptop = document.getElementById("name_laptop"); //Nombre
const price_laptop = document.getElementById("price_laptop"); //Precio
let row_laptop = document.getElementById("row_laptop"); //Columna

//Botones
const sum_button_laptop = document.getElementById("sum_button_laptop");
const substract_button_laptop = document.getElementById("substract_button_laptop");

//Actualización en purchase
purchase[1].name = name_laptop.innerHTML;
purchase[1].price = parseInt(price_laptop.innerHTML.split(".").join(""));

sum_button_laptop.onclick = function(){
    add_product(1, quantity_laptop, substract_button_laptop, row_laptop);
};

substract_button_laptop.onclick = function(){
    delete_product(1, quantity_laptop, substract_button_laptop, row_laptop);
};

/* Variables del xbox*/
const quantity_xbox = document.getElementById("quantity_xbox"); //Cantidad
const name_xbox = document.getElementById("name_xbox"); //Nombre
const price_xbox = document.getElementById("price_xbox"); //Precio
let row_xbox = document.getElementById("row_xbox"); //Columna

//Botones
const sum_button_xbox = document.getElementById("sum_button_xbox");
const substract_button_xbox = document.getElementById("substract_button_xbox");

//Actualización en purchase
purchase[2].name = name_xbox.innerHTML;
purchase[2].price = parseInt(price_xbox.innerHTML.split(".").join(""));

sum_button_xbox.onclick = function(){
    add_product(2, quantity_xbox, substract_button_xbox, row_xbox);
};

substract_button_xbox.onclick = function(){
    delete_product(2, quantity_xbox, substract_button_xbox, row_xbox);
};

/* Configuración del boton de reset */
const reset_button = document.getElementById("reset_button");

reset_button.addEventListener("click", () => {
    purchase[0].quantity = purchase[1].quantity = purchase[2].quantity = 0;
    row_cellphone.innerHTML = row_laptop.innerHTML = row_xbox.innerHTML = "";
    final_price.innerHTML = 0;
    quantity_cellphone.innerHTML = purchase[0].quantity;
    quantity_laptop.innerHTML = purchase[1].quantity;
    quantity_xbox.innerHTML = purchase[2].quantity;
});
</script>
`;

const html_form = `
<section class="container mt-6">
<h2 class="is-size-4">Agregar productos</h2>
<form action="/agregar" method="POST">
    <div class="field">
        <label class="label" for="nombre_producto">Nombre del producto</label>
        <div class="control">
          <input class="input" id="nombre_producto" name="nombre_producto" type="text" placeholder="Ingrese nombre del producto">
        </div>
      </div>
      <div class="field">
        <label class="label" for="precio_producto">Precio</label>
        <div class="control">
          <input class="input" id="precio_producto" name="precio_producto" type="number" placeholder="Ingrese precio del producto">
        </div>
      </div>
      <div class="field">
        <label class="label" for="descripcion_producto">Descripción: </label>
        <div class="control">
          <input class="input" id="descripcion_producto" name="descripcion_producto" type="text" placeholder="Ingrese una descripción del producto">
        </div>
      </div>
      <div class="field">
      <label class="label" for="imagen_producto">Url de la imagen</label>
      <div class="control">
        <input class="input" id="imagen_producto" name="imagen_producto" type="text" placeholder="Ingrese url de la imagen del producto">
      </div>
    </div>
      <div class="field is-grouped">
        <div class="control">
          <input class="button is-link" type="submit" value="Crear">
        </div>
      </div>
</form>
</section>
`;

const html_validar_contrasenia = `
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Poner caracteres especiales -->
    <meta charset="UTF-8">
    <!-- Indica al navegador que va a ser responsivo -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Titulo a la pestaña -->
    <title>Laboratorios Web</title>
    <!-- Imagen de la pestaña 32x32 (favicon) -->
    <link rel="shortcut icon" href="" type="image/x-icon">
    <!-- Estilos -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        
        /*-------------------- Barra de seguridad -------------------*/
        #barra-seguridad {
            width: 0%;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px;
        }
        
        
        .preguntas.container {
            width: 50%;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 1px 2px 4px #000;
        }
        
        .respuesta {
            border: none;
        }
        
        .contraseña.container {
            width: 30%;
            max-width: 1200px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 1px 2px 4px #000;
            text-align: center;
        }
        
        input {
            width: 80%;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        /*----------------------- Pie de pagina ----------------------*/
        /*Color del enlace*/
        a {
            color: #0056b3; /*Color del enlace*/
        }
        /*Color del enlace cuando el cursor está sobre él*/
        a:hover {
            color: #ff00ff;
        }
        /*Color del enlace cuando está siendo activado*/
        a:active {
            color: #ff00ff; /* Magenta */
        }
        
        footer {
            width: 50%;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="contraseña container">
        <h1>Validar Contraseña</h1>
        <!-- etiqueta from para inputs -->
        <form action="/validar-contrasiena" method="POST">
            <!-- for es para clicear el nombre  -->
            <label for="password">Contraseña:</label><br>
            <input type="password" id="password" oninput="nivelSeguridad()" name="password"><br>
            <div>
                <div id="barra-seguridad"></div>
            </div>
            <p id="nivel-seguridad"></p>
            
            <label for="confirm-password">Confirmar contraseña:</label><br>
            <input type="password" id="confirm-password" name="confirm_password"><br>
            <!-- type="submit" Eviar datos de los inputs del formaulario -->
            <input type="submit" value="Validar">
        </form>
    </div>
    <div class="preguntas container">
        <button type="submit" id="preguntas" onclick="mostrarPreguntas()">Preguntas</button>
        <div class="seccion-preguntas" id="seccion-preguntas" hidden>
            <h1>Preguntas</h1>
            <p class="preguntas">1.- <strong>¿Por qué es una buena práctica usar JavaScript para checar que sean válidos los inputs de las formas antes de enviar los datos al servidor?</strong></p>
            <ol class="respuesta">
                <li>Mejora la experiencia del usuario.</li>
                <li>Mejora el rendimiento del sitio web.</li>
                <li>Ahorra ancho de banda.</li>
                <li>Mejora la seguridad del sitio web.</li>
            </ol>
            <p class="preguntas">2.- <strong>¿Cómo puedes saltarte la seguridad de validaciones hechas con JavaScript?</strong></p>
            <ol class="respuesta">
                <li>Desactivando JavaScript en el navegador.</li>
                <li>Modificar el código fuente mediante el inspector.</li>
                <li>No hacer un duplicado de las validaciones en el servidor.</li>
            </ol>
            <p class="preguntas">3.- <strong>Si te puedes saltar la seguridad de las validaciones de JavaScript, entonces ¿por qué la primera pregunta dice que es una buena práctica?</strong></p>
            <p class="respuesta">Porque al validar los inputs de las formas antes de enviar los datos al servidor porque proporciona una capa adicional de seguridad y reduce el tiempo de carga mejorando la experiencia del usuario</p>
        </div>
    </div>

    <footer class="footer">
        <p>Referencias: </p>
        <p><a href="https://chat.openai.com/">https://chat.openai.com/</a></p>
    </footer>
        
    <script>
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const mostarPreguntas = document.getElementById('seccion-preguntas');
        const buttonPreguntas = document.getElementById('preguntas');
        const buttonValidar = document.getElementById('button');
        let barraFuerza = document.getElementById('barra-seguridad');

        function nivelSeguridad() {
            let fuerza = 0;
            let mayuscula = /[A-Z]+/;
            let minuscula = /[a-z]+/;
            let numero = /[0-9]+/;
            let charact = /[!@#$%^&*()_+\-\=\;':"\|,.<>\/?]+/;        
            if (passwordInput.value.length >= 8) {
                fuerza += 1;
            }
            if (passwordInput.value.match(mayuscula)) {
                fuerza += 1;
            }
            if (passwordInput.value.match(minuscula)) {
                fuerza += 1;
            }
            if (passwordInput.value.match(numero)) {
                fuerza += 1;
            }
            if (passwordInput.value.match(charact)) {
                fuerza += 1;
            }
            
        
            //Actualizar el estilo de las barras de acuerdo a la fuerza
            if (fuerza === 1) {
                barraFuerza.style.width = '20%';
                barraFuerza.style.backgroundColor = '#f00'; //Rojo
                document.getElementById('nivel-seguridad').innerText = 'Seguridad: Baja';
            } else if (fuerza === 2) {
                barraFuerza.style.width = '40%';
                barraFuerza.style.backgroundColor = '#f00'; //Rojo
                document.getElementById('nivel-seguridad').innerText = 'Seguridad: Baja';
            } else if (fuerza === 3) {
                barraFuerza.style.width = '60%';
                barraFuerza.style.backgroundColor = '#ff0'; //Amarillo
                document.getElementById('nivel-seguridad').innerText = 'Seguridad: Media';
            } else if (fuerza === 4) {
                barraFuerza.style.width = '80%';
                barraFuerza.style.backgroundColor = '#ff0'; //Amarillo
                document.getElementById('nivel-seguridad').innerText = 'Seguridad: Media';
            } else if (fuerza === 5) {
                barraFuerza.style.width = '95%';
                barraFuerza.style.backgroundColor = '#0f0'; //Verde
                document.getElementById('nivel-seguridad').innerText = 'Seguridad: Alta';
            } else {
                barraFuerza.style.width = '0%';
                barraFuerza.style.backgroundColor = '#fff'; //Blanco
                document.getElementById('nivel-seguridad').innerText = '';
            }
        }
        
        function validar() {
            if (passwordInput.value === "" || confirmPasswordInput.value === "") {
                alert('Por favor, rellene todos los campos.');
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                alert('Las contraseñas no coinciden.');
            } else {
                    let widthValue = parseFloat(barraFuerza.style.width);
                    if (widthValue < 60) {
                        alert('Contraseña no segura.');
                    } else {
                        alert('Contraseña correcta y segura.');
                    }
            }
        }
        
        function mostrarPreguntas() {
            mostarPreguntas.hidden = !mostarPreguntas.hidden; //Alternar el estado hidden
        }
        
        //Eventos del botón
        buttonPreguntas.addEventListener('mouseover', function() {
            if (mostarPreguntas.hidden === false) {
                buttonPreguntas.style.fontFamily = 'Courier New'; //Cambiar la tipografía del botón
                buttonPreguntas.textContent = 'Click para ocultar preguntas'; //Cambiar el texto del botón
            } else {
                buttonPreguntas.style.fontFamily = 'Courier New'; //Cambiar la tipografía del botón
                buttonPreguntas.textContent = 'Click para mostrar preguntas'; //Cambiar el texto del botón
            }
        }); 
        
        buttonPreguntas.addEventListener('mouseout', function() {
            buttonPreguntas.style.fontFamily = 'Arial, sans-serif'; //Cambiar la tipografía del botón
            buttonPreguntas.textContent = 'Preguntas'; //Cambiar el texto del botón
        });
        
        buttonValidar.addEventListener('mouseover', function() {
            buttonValidar.textContent = 'Validar'; //Cambiar el texto del botón
        });
        
        buttonValidar.addEventListener('mouseout', function() {
            buttonValidar.textContent = 'Click validar'; //Cambiar el texto del botón
        });
    </script>
</body>
</html>
`;

let productos = [
    {
        cantidad: 0,
        nombre: "Apple iPhone 15 Pro 6.7-inch",
        precio: 15000,
        descripcion: "El iPhone 15 Pro es el nuevo teléfono de Apple, con una pantalla de 6.7 pulgadas y una cámara de 12 MP",
        url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708"

    },
    {
        cantidad: 0,
        nombre: "Computadora Portátil AceMagic",
        precio: 7000,
        descripcion: "La computadora portátil AceMagic es una computadora con un procesador Intel Core i7, 16 GB de RAM y 1 TB de almacenamiento",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cyVYick1IZP-wCTYOcR0Sa70I2_KcSXZCw&usqp=CAU"
    },
    {
        cantidad: 0,
        nombre: "Xbox Series S",
        precio: 8500,
        descripcion: "La Xbox Series S es la nueva consola de Microsoft, con una resolución de 1080p y almacenamiento de 512 GB",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRDnf9c617c4TM_V1cmrmG4uJ3EsDI_I-Pw&usqp=CAU"
    }
];

let carrito = [];

router.get('/validar-contrasiena', (request, response, next) => {
    let html = html_head;
    html += html_validar_contrasenia
    response.send(html);
});

router.post('/validar-contrasiena', (request, response, next) => {
    console.log(request.body);
    if (request.body.password === request.body.confirm_password){
        response.redirect('/');
    } else {
        response.redirect('/validar-contrasiena');
    }
});

router.get('/agregar', (request, response, next) => {
    let html = html_head;
    html += html_form;
    html += html_footer;
    response.send(html);
});

router.post('/agregar', (request, response, next) => {
    console.log(request.body);
    productos.push({
        cantidad: 0,
        nombre: request.body.nombre_producto,
        precio: request.body.precio_producto,
        descripcion: request.body.descripcion_producto,
        url: request.body.imagen_producto
    });
    //Agregar productos a un txt
    filesystem.writeFileSync('Lab11/productos.txt', '');
    for (let i = 0; i < productos.length; i++) {
        filesystem.appendFileSync('Lab11/productos.txt', productos[i].nombre  + "\n" + productos[i].precio + "\n" + productos[i].descripcion + "\n" + productos[i].url+ "\n\n");
    }
    response.redirect('/');
});

router.get('/', (request, response, next) => {
    //response.redirect('/validar-contrasiena');
    let html = html_head;
    html += html_main;
    html += '<div class="columns">';
    let i = 1
    for (i in productos) {
        if (i % 3 == 0){
            html += `
            </div>
            <div class="columns">`;
        }
        html += `
        <div class="column is-one-third">
            <div class="card has-background-info-light">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="${productos[i].url}" alt="Xbox">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4" id="name_${i}">${productos[i].nombre}</p>
                            <p class="subtitle is-6">$<span id="price_${i}">${productos[i].precio}</span></p>
                        </div>
                    </div>
                    <div class="content">
                        <p>Lo que tienes que saber de este producto:</p>
                        <p>${productos[i].descripcion}</p>
                        <p class="subtitle is-4">Cantidad</p>
                        <div class="columns">
                            <div class="column is-one-fifth">
                                <button class="button is-small is-dark" id="sum_button_${i}">+</button>
                            </div>
                            <div class="column is-one-fifth">
                                <button class="button is-small is-dark" id="substract_button_${i}">-</button>
                            </div>
                            <div class="column">
                                <p class="is-size-6 quantity" id="quantity_${i}">${productos[i].cantidad}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        `;
    }
    html += html_footer;
    response.send(html);
});

module.exports = router;