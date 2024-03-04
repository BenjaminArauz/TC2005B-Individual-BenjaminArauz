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

              <a class="navbar-item" href="/preguntas-referencias">
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
            <div class="columns">
`;

const html_footer = `    
</div>
</section>
<section class="container mt-6">
    <h2 class="is-size-4">Preguntas</h2>
    <ol>
        <li>
            <h3 class="is-size-5 has-text-weight-bold mt-3">
                ¿Por qué es una buena práctica usar JavaScript para checar que sean válidos los inputs de las formas antes de enviar los datos al servidor?
            </h3>
            <p class="is-size-6 mt-2">
                Es buena práctica para la validación en el lado del cliente, debido a que puede actuar como una capa adicional de seguridad al evitar que datos maliciosos o no válidos lleguen al servidor.
            </p>
        </li>
        <li>
            <h3 class="is-size-5 has-text-weight-bold mt-3">
                ¿Cómo puedes saltarte la seguridad de validaciones hechas con JavaScript?
            </h3>
            <p class="is-size-6 mt-2">
                Se puede saltar las validaciones de JavaScript, enviando datos directamente al servidor sin pasar por la capa de seguridad, ni las validaciones del lado del cliente.
            </p>
        </li>
        <li>
            <h3 class="is-size-5 has-text-weight-bold mt-3">
                Si te puedes saltar la seguridad de las validaciones de JavaScript, entonces ¿por qué la primera pregunta dice que es una buena práctica?
            </h3>
            <p class="is-size-6 mt-2">
                Es una buena práctica porque proporciona una mejor experiencia del usuario. Además, puede ayudar a prevenir errores y a poder guiar al usuario en ingresar la información correctamente
            </p>
        </li>
    </ol>
</section>
</main>
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

const http = require('http');
const server = http.createServer((request, response) => {
    
    if (request.url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write(html_head);
        response.write(html_main);
        let html_products = '';
        for (let i in productos) {
            html_products += `
            <div class="column">
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
        response.write(html_products);
        response.write(html_script);
        response.end();
    } 
    //Agregar productos del lado del clientea
    else if (request.url === '/agregar' && request.method == "GET") {
        response.setHeader('Content-Type', 'text/html');
        response.write(html_head);
        response.write(html_form);
        response.write(html_footer);
        response.end();
    } 
    //Agregar productos en el servidor
    else if (request.url === "/agregar" && request.method == "POST") {
        const datos = [];
        //Evaluar lo que va poniendo el usuario
        request.on('data', (dato) => {
            console.log(dato);
            datos.push(dato);
            
        });
        
        return request.on('end', () => {
            const datos_completos = Buffer.concat(datos).toString();
            console.log(datos_completos);
            let input_nombre = datos_completos.split('&')[0].split('=')[1];
            input_nombre = input_nombre.replace(/[+%]/g, ' ');
            console.log(input_nombre);
            const input_precio = datos_completos.split('&')[1].split('=')[1];
            console.log(input_precio);
            let input_descripcion = datos_completos.split('&')[2].split('=')[1];
            input_descripcion = input_descripcion.replace(/[+%]/g, ' ');
            console.log(input_descripcion);
            const input_url = decodeURIComponent(datos_completos.split('&')[3].split('=')[1]);
            console.log(input_url);
            productos.push({
                cantidad: 0,
                nombre: input_nombre,
                precio: input_precio,
                descripcion: input_descripcion,
                url: input_url
            });
            response.writeHead(302, { 'Location': '/' });
            return response.end();
        });
    } else if (request.url === "/preguntas-referencias") {
        response.setHeader('Content-Type', 'text/html');
        response.write(html_head);
        response.write(html_footer);
        response.write(html_script);
        response.end();
    } 
    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write(html_head);
        response.write(`<h2 class="title">Error 404</h2>`);
        response.end();
    }
});

server.listen(3000);