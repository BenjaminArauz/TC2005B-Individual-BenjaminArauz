const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

const rutasHome = require('./routes/home.routes.js');
const rutasFeedback = require('./routes/feedback.routes.js');

app.use('/', rutasHome);
app.use('/feedback', rutasFeedback);

//Respuesta a la página 404
app.use((request, response, next) => {
    response.status(404);
    let html = html_head;
    html += `<h2 class="title">Error 404 D:</h2>`;
    response.send(html); //Manda la respuesta
});

app.listen(3000);