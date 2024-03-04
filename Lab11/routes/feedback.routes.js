const express = require('express');
const router = express.Router();

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
        <section class="container content is-normal">
            <h2 class="is-size-4">Ayuda</h2>
            <section class="container is-max-desktop">
                <h3 class="is-size-5 has-text-weight-bold mt-3">Validador de contraseña</h3>
                <p class="is-size-6 mt-2">Aqui hay algunos tips: </p>
                <ul>
                    <li>
                        <p class="is-size-6 mt-2">
                            Tener como mínimo 8 caracteres
                        </p>
                    </li>
                    <li>
                        <p class="is-size-6 mt-2">
                            Usar al menos un caracter especial (@ * , . + - etc)
                        </p>
                    </li>
                    <li>
                        <p class="is-size-6 mt-2">
                            Tener al menos un número
                        </p>
                    </li>
                    <li>
                        <p class="is-size-6 mt-2">
                            Tener al menos una mayuscula y minuscula
                        </p>
                    </li>
                </ul>
            </section>
            <section class="container is-max-desktop">
                <h3 class="is-size-5 has-text-weight-bold mt-3">Agregar producto</h3>
                <p class="is-size-6 mt-2">Aqui hay algunos tips: </p>
                <ul>
                    <li>
                        <p class="is-size-6 mt-2">
                            Nombre: Un nombre fácil de reconocer
                        </p>
                    </li>
                    <li>
                        <p class="is-size-6 mt-2">
                            Url: Asegurarse que la url de la imagén sea válida para páginas web
                        </p>
                    </li>
                    <li>
                        <p class="is-size-6 mt-2">
                            Costo: asegurarse que el costo sea el correcto
                        </p>
                    </li>
                    <li>
                        <p class="is-size-6 mt-2">
                            Descripción: Tener una descripción correcta para el producto
                        </p>
                    </li>
                </ul>
            </section>
        </section>
    </main>
`;

const html_footer = `    
</div>
</section>
<section class="container mt-6 content is-normal">
    <h2 class="is-size-4">Preguntas</h2>
    <h3 class="is-size-5 has-text-weight-bold mt-3">
        Describe el archivo package.json.
    </h3>
    <p class="is-size-6 mt-2">
        El principal uso es manejar la publicación de un proyecto al público para que otros puedan utilizarlo. Además, se puede administrar las dependencias de tu proyecto. Las características que tienen son las siguientes:
    </p>
    <ul>
        <li>
            <p class="is-size-6 mt-2">
                Name: Nombre del proyecto.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Version: Versión del proyecto.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Description: Descripción del proyecto.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Main: Archivo principal del proyecto.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Script: Conjunto de scripts de inicio y utilidades.
            </p>
            <ul>
                <li>
                    <p class="is-size-6 mt-2">
                        Start: Iniciar la aplicación de node con un nombre predefinido.
                    </p>
                </li>
                <li>
                    <p class="is-size-6 mt-2">
                        Test: Ejecutar pruebas automatizadas.
                    </p>
                </li>
            </ul>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Repository: Repositorio del proyecto de github.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Keywords: Palabra clave para encontrar el proyecto.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Author: Autores del proyecto.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                License: Especificar la licencia para el cual distribuir el paquete.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Bugs: Url donde los usuarios pueden reportar los bugs.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Homepage: Url a la página principal del proyecto, donde se puede encontrar la documentación sobre el proyecto.
            </p>
        </li>
        <li>
            <p class="is-size-6 mt-2">
                Dependencies: Paquetes de software externos que el proyecto necesita para funcionar correctamente.
            </p>
        </li>
    </ul>
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

router.get('/ayuda', (request, response, next) => {
    let html = html_head;
    html += html_main;
    response.send(html);
});

router.get('/preguntas-referencias', (request, response, next) => {
    let html = html_head;
    html += html_footer;
    response.send(html);
});

module.exports = router;