const average = (numbers) => {
    let sum = 0;
    const len = numbers.length
    for (let i = 0; i < len; i++){
        sum += numbers[i];
    }
    return sum/len;
}

const create_random = () => {
    let numbers = [];
    const lengthNumbers = Math.floor(Math.random() * 15);
    for (let i = 0; i < lengthNumbers; i++){
        numbers.push(Math.floor(Math.random() * 21));
    }
    return numbers;    
}

let numbers = create_random();
let avg = average(numbers);
console.log("El promedio de la lista " + numbers + " es " + avg);

const create_file = (str) => {
    const filesystem = require('fs');
    filesystem.writeFileSync('ejercicio.txt', str);
    console.log("Archivo generado");
}

create_file("Ejercicio número 2, laboratorio 8 creado con filesystem");

const binary_search_aux = (v, low, high, val) => {
    let mid;
    if (low <= high) {
        mid = Math.floor((high + low) / 2);
        if (val === v[mid]) {
            return mid;
        } else if (val < v[mid]) {
            return binary_search_aux(v, low, high - 1, val);
        } else if (val > v[mid]) {
            return binary_search_aux(v, low + 1, high, val);
        }
    }
    return -1; 
}

const binary_search = (numbers, size, val) => {
    return binary_search_aux(numbers, 0, size - 1, val); 
}

let arr = create_random();
let search_number = arr[0];
arr.sort(function(a, b){return a - b});

console.log("El número " + search_number + " de la lista " + arr + " esta en la posición " + binary_search(arr, arr.length, search_number));

const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Laboratorio</title>
        <link rel="shortcut icon" href="../images/icon.png" type="image/x-icon">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    </head>
    <body>
        <article>
            <header class="card text-bg-dark">
                <img src="../images/header-image.jpeg" alt="Header" class="card-img" style="height: 80vh;">
                <div class="card-img-overlay">
                    <h1 class="text-center display-1 card-title mt-5 mb-5">Laboratorios</h1>
                    <nav class="d-flex align-items-center flex-column mb-3 flex-sm-column">
                        <p class="mb-2 p-2 bg-light text-primary rounded-pill" id="matricula">Matricula: A00836936</p>
                        <p class="mt-2 p-2 bg-light text-primary rounded-pill" id="name">Nombre: Benjamín Arauz</p>
                    </nav>
                </div>
            </header>
        </article>
        <main class="container-sm text-start">
            <section>
                <h2 class="text-center display-4 mt-5">Laboratorio 1</h2>
                <ol>
                    <!-- Primera pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Cuál es la diferencia entre Internet y la World Wide Web?
                        </h3>
                        <p class="lh-base mt-3">
                            Internet es una red de computadoras que estan conectadas entre sí, mientras que World Wide Web es una aplicación que se ejecuta sobre la infraestructura de internet, permitiendo compartir información sobre las paginas web.
                        </p>
                    </li>
    
                    <!-- Segunda pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Cuáles son las partes de un URL?
                        </h3>
                        <ul class="mt-3">
                            <li>
                                <strong>Protocolo:</strong> Indica cual protocolo se debe usar para acceder a la comunicación, "http/" o "https://" para paginas web seguras.
                            </li>
                            <li>
                                <strong>Nombre de dominio:</strong> Es el nombre de sitio web que identifica en el internet.
                            </li>
                            <li>
                                <strong>Ruta:</strong> Es el nombre de sitio web que identifica en el internet.
                            </li>
                            <li>
                                <strong>Parámetro:</strong> Proporciona información adicional sobre cómo debe acceder al recurso.
                            </li>
                        </ul>
                    </li>
    
                    <!-- Tercera pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Cuál es el propósito de los métodos HTTP: GET, HEAD, POST, PUT, PATCH, DELETE?
                        </h3>
                        <p class="lh-base mt-3">
                            Los métodos HTTP son acciones con los recursos identificados por el URL, entre los más comunes están:
                        </p>
                        <ul>
                            <li>
                                <strong>GET:</strong> Es utilizado para poder obtener datos de algún lugar, principalmente de un servidor
                            </li>
                            <li>
                                <strong>HEAD:</strong> Solicita únicamente el encabezado de respuesta, sin el mensaje. Es útil para obtener información sin descargarla.
                            </li>
                            <li>
                                <strong>POST:</strong> Enviar una entidad a un recurso específico, causando cambios en el servidor
                            </li>
                            <li>
                                <strong>PUT:</strong> Reemplaza las representaciones del destino con la carga de la petición.
                            </li>
                            <li>
                                <strong>PATCH:</strong> Es utilizado para aplicar modificaciones parciales a un recurso.
                            </li>
                            <li>
                                <strong>DELETE:</strong> Borra un recurso en específico.
                            </li>
                        </ul>
                    </li>
    
                    <!-- Cuarta pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Qué método HTTP se debe utilizar al enviar un formulario HTML, por ejemplo cuando ingresas tu usuario y contraseña en algún sitio? ¿Por qué?
                        </h3>
                        <p class="lh-base mt-3">
                            El método que se debe utilizar es POST, puesto que, introduce los parámetros en la solicitud HTTP para el servidor, lo que significa, que no queda visible para el usuario, los datos no se muestran en el cache ni en el historial.
                        </p>
                    </li>
    
                    <!-- Quinta pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Qué método HTTP se utiliza cuando a través de un navegador web se accede a una página a través de un URL?
                        </h3>
                        <p class="lh-base mt-3">
                            El método que se utiliza es GET, porque este método se utiliza para realizar una representación de un recurso en específico.
                        </p>
                    </li>
    
                    <!-- Sexta pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            Un servidor web devuelve una respuesta HTTP con código 200. ¿Qué significa esto? ¿Ocurrió algún error?
                        </h3>
                        <p class="lh-base mt-3">
                            El código de estado 200, se utiliza para indicar que recibió, procesó y realizó una solicitud correctamente.
                        </p>
                    </li>
    
                    <!-- Septima pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 404? ¿Por qué?
                        </h3>
                        <p class="lh-base mt-3">
                            Sí, es responsabilidad del desarrollador corregir si se encuentra un error 404, el error 404 indica que el servidor no pudo encontrar el recurso solicitado.
                        </p>
                    </li>
    
                    <!-- Octava pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 500? ¿Por qué?
                        </h3>
                        <p class="lh-base mt-3">
                            El error 500 o también conocido como un "Error interno del servidor", indica que ha ocurrido un problema con el servidor que impide procesar la solicitud del usuario.
                        </p>
                    </li>
    
                    <!-- Novena pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Qué significa que un atributo HTML5 esté depreciado o desaprobado (deprecated)? Menciona algunos elementos de HTML 4 que en HTML5 estén desaprobados.
                        </h3>
                        <p class="lh-base mt-3">
                            Cuando un atributo HTML esta despreciado, significa que aún no es compatible con los navegadores. Algunos elementos
                        </p>
                        <ul>
                            <li>font</li>
                            <li>center</li>
                            <li>frame</li>
                            <li>acronym</li>
                        </ul>
                    </li>       
    
                    <!-- Decima pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Cuáles son las diferencias principales entre HTML 4 y HTML5?
                        </h3>
                        <p class="lh-base mt-3">
                            Las principales diferencias son:
                        </p>
                        <ul>
                            <li>
                                HTML5 tiene una sintaxis más clara y legible, de la misma manera, tiene una semántica mejorada que permite a los desarrolladores estructurar los documentos de una manera más legible.
                            </li>
                            <li>
                                HTML5 ofrece soporte para audio y video sin la necesidad de hacer plugins externos 
                            </li>
                            <li>
                                HTML5 proporciona numerosas APIs integradas que permiten a los desarrolladores acceder a funciones avanzadas del navegador 
                            </li>
                            <li>
                                La compatibilidad que HTML5 ofrece una mejor compatibilidad con dispositivos móviles, lo cual, facilita la creación de sitios web que se adapten a diferentes tamaños de pantallas.
                            </li>
                        </ul>
                    </li>
                        
                    <!-- Onceava pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Qué componentes de estructura y estilo tiene una tabla?
                        </h3>
                        <strong class="lh-base mt-3">Estructura</strong>
                        <ul>
                            <li>table</li>
                            <li>tr</li>
                            <li>th</li>
                            <li>thead</li>
                            <li>tbody</li>
                            <li>tfoot</li>
                            <li>caption</li>
                        </ul>
                        <strong>Estilo</strong>
                        <ul>
                            <li>border-collapse</li>
                            <li>border</li>
                            <li>border-spacing</li>
                            <li>caption-side</li>
                            <li>empty-cells</li>
                            <li>table-layout</li>
                        </ul>
                    </li>
    
                    <!-- Doceava pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Cuáles son los principales controles de una forma HTML5?
                        </h3>
                        <ul class="mt-3">
                            <li>input</li>
                            <li>button</li>
                            <li>datalist</li>
                            <li>textarea</li>
                            <li>legend</li>
                            <li>select</li>
                            <li>label</li>
                        </ul>
                    </li>
    
                    <!-- Treceava pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Qué tanto soporte HTML5 tiene el navegador que utilizas? Puedes utilizar la siguiente página para descubrirlo: http://html5test.com/ (Al responder la pregunta recuerda poner el navegador que utilizas)
                        </h3>
                        <p class="lh-base mt-3">
                            El navegador que utilizo es Chrome y el soporte es de 576/594.
                        </p>
                    </li>
    
                    <!-- Catorceava pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Cuál es el ciclo de vida de los sistemas de información?
                        </h3>
                        <ul class="mt-3">
                            <li>
                                <strong>Nace:</strong> El sistema nace cuando comienza a detectar la oportunidad de crear un sistema de información. 
                            </li>
                            <li>
                                <strong>Desarrolla:</strong> El sistema se desarrolla cuando se crea el sistema.
                            </li>
                            <li>
                                <strong>Producción:</strong> La producción cuando se implementa, se prueba y se corrigen las fallas existentes. 
                            </li>
                            <li>
                                <strong>Muere:</strong> Cuando el sistema no satisface las necesidades.
                            </li>
                        </ul>
                    </li>
    
                    <!-- Quinceava pregunta -->
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Cuál es el ciclo de desarrollo de sistemas de información?
                        </h3>
                        <ul class="mt-3">
                            <li>
                                <strong>Desarollo basado en modelos:</strong> Se tiene como objetivo el desarrollo de un SI de tamaño mediano o grande, permite dividir el trabajo en fases.
                            </li>
                            <li>
                                <strong>Desarrollo rápido de aplicaciones (RAD):</strong> Este enfoque se basa en el uso de herramientas que permiten acelerar el desarrollo, ya que mejora su ciclo de vida, en tanto se pueden utilizar las herramientas existentes en el mercado que generan código.
                            </li>
                            <li>
                                <strong>Paquete de software de aplicaciones:</strong> Las necesidades de los usuarios en cada organización son distintas; sin embargo, un conjunto de ellas hace referencia a procesos estandarizados y que no varían a lo largo del tiempo.
                            </li>
                            <li>
                                <strong>Desarrollo por parte del usuario final: </strong> Una organización se conforma de una gran cantidad de áreas funcionales, integradas por un número considerable de personas con múltiples necesidades en relación con la información y su trabajo.
                            </li>
                        </ul>
                    </li>
                </ol>
            </section>
            <section>
                <h2 class="text-center display-4 mt-5">Laboratorio 3</h2>
                <ol>
                    <li>
                        <h3 class="text-start h3 mt-4">
                            Como ingeniero de software ¿cuál es tu recomendación sobre el uso de !important en un CSS? 
                        </h3>
                        <p class="lh-base mt-3">
                            Mi recomendación es evitar !important, puesto que, es una declaración que le da prioridad a una regla de CSS sobre otras reglas que podrían afectar a uno o varios elementos. El uso excesivo es un código difícil de entender. 
                        </p>
                    </li>
                    <li>
                        <h3 class="text-start h3 mt-4">
                            Si se pone una imagen de fondo en una página HTML, ¿por qué debe escogerse con cuidado?
                        </h3>
                        <p class="lh-base mt-3">
                            Es importante escoger una imagén de fondo, puesto que puede afectar la estética y la usabilidad del sitio. Además, la imagén no debe interferir con la legibilidad del texto, debe tener un contraste adecuado para que sea fácil de leer. 
                        </p>
                    </li>
                    <li>
                        <h3 class="text-start h3 mt-4">
                            Como ingeniero de software, ¿cuál es tu recomendación al elegir las unidades de un propiedad de estilo entre %, px y pt?
                        </h3>
                        <p class="lh-base mt-3">
                            Mi recomendación, es que, no sean unidades absolutas o fijas, que sean unidades relativas para un diseño más flexible y que se pueda adaptar en diferentes tamaños de pantalla y dispositivos.
                        </p>
                    </li>
                    <li>
                        <h3 class="text-start h3 mt-4">
                            ¿Por qué el uso de una versión minimizada del CSS mejora el rendimiento del sitio?
                        </h3>
                        <p class="lh-base mt-3">
                            Una versión minimizada del CSS ayuda a acelerar el tiempo de renderizado de la página, menos código significa menos trabajo para el navegador a la hora de aplicar estilos en la página.
                        </p>
                    </li>
                </ol>
            </section> 
            <section>
                <h2 class="text-center display-4 mt-5">Laboratorio 4</h2>
                <script src="../script.js"></script>
            </section> 
            <section>
                <h2 class="text-center display-4 mt-5">Laboratorio 5</h2>
                <ol>
                    <li>
                        <h3 class="text-start h3 mt-4">
                            Describe el material design
                        </h3>
                        <p class="lh-base mt-3">
                            Material Design es un sistema de diseño que se utiliza para crear interfaces de usuario coherentes y visualmente atractivas en diversos sitios web. Proporciona pautas detalladas sobre cómo diseñar componentes de interfaz de usuario, como botones, tarjetas, barras de navegación y elementos de entrada, con el objetivo de ofrecer una experiencia de usuario intuitiva y coherente en todas las plataformas y dispositivos. 
                        </p>
                    </li>
                </ol>
            </section>      
        </main>
        <footer class="bd-footer py-4 py-md-5 px-5 px-md-6 mt-5 bg-body-tertiary">
            <p class="text-body-secondary">
               Esta página esta diseñada con: <a href="https://code.visualstudio.com/">Visual Studio Code</a>
            </p>
           <section>
                <h3>Referencias</h3>
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <a href="https://www.freecodecamp.org/news/http-request-methods-explained/">https://www.freecodecamp.org/news/http-request-methods-explained/</a>
                    </li>
                    <li class="mb-2">
                        <a href="https://www.freecodecamp.org/news/http-and-everything-you-need-to-know-about-it/">https://www.freecodecamp.org/news/http-and-everything-you-need-to-know-about-it/</a>
                    </li>
                    <li class="mb-2">
                        <a href="https://medium.com/codex/i-bet-you-didnt-know-about-these-15-html-features-9b0824dba28f">https://medium.com/codex/i-bet-you-didnt-know-about-these-15-html-features-9b0824dba28f</a>
                    </li>
                    <li class="mb-2">
                        <a href="https://www.ionos.mx/digitalguide/paginas-web/creacion-de-paginas-web/que-significa-el-error-404-not-found/">https://www.ionos.mx/digitalguide/paginas-web/creacion-de-paginas-web/que-significa-el-error-404-not-found/</a>
                    </li>
                    <li class="mb-2">
                        <a href="https://www.ionos.mx/digitalguide/paginas-web/desarrollo-web/get-vs-post/">https://www.ionos.mx/digitalguide/paginas-web/desarrollo-web/get-vs-post/</a>
                    </li>
                    <li class="mb-2">
                        <a href="https://www.integrasistemas.es/blog/general/uso-de-important-en-css/#:~:text=important%3B%20en%20CSS%2C%20no%20se,desactiva%20las%20reglas%20de%20cascada.">https://www.integrasistemas.es/blog/general/uso-de-important-en-css/#:~:text=important%3B%20en%20CSS%2C%20no%20se,desactiva%20las%20reglas%20de%20cascada.</a>
                    </li>
                </ul>
           </section>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </body>
    </html>
    `);
    response.end();
});

server.listen(3000);